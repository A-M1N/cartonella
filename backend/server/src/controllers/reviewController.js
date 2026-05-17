import prisma from "../lib/prisma.js";

// check if user has purchased the product
const hasUserPurchasedProduct = async (userId, productId) => {
  const order = await prisma.order.findFirst({
    where: {
      userId: userId,
      status: "DELIVERED",
      items: {
        some: {
          productId: parseInt(productId),
        },
      },
    },
  });
  return !!order;
};

// @route GET /api/products/:productId/reviews
// desc Get Product Reviews
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, sort = "newest" } = req.query;

    let orderBy = { createdAt: "desc" };
    if (sort === "oldest") orderBy = { createdAt: "asc" };
    if (sort === "highest") orderBy = { rating: "desc" };
    if (sort === "lowest") orderBy = { rating: "asc" };
    if (sort === "helpful") orderBy = { helpfulCount: "desc" };

    const take = parseInt(limit);
    const skip = parseInt(page - 1) * take;

    const reviews = await prisma.review.findMany({
      where: {
        productId: parseInt(productId),
        isApproved: true,
      },
      orderBy,
      take,
      skip,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    const total = await prisma.review.count({
      where: {
        productId: parseInt(productId),
        isApproved: true,
      },
    });

    const ratingStats = await prisma.review.groupBy({
      by: ["rating"],
      where: {
        productId: parseInt(productId),
        isApproved: true,
      },
      _count: {
        rating: true,
      },
    });

    const avgRating = await prisma.review.aggregate({
      where: {
        productId: parseInt(productId),
        isApproved: true,
      },
      _avg: {
        rating: true,
      },
    });

    const ratingDistribution = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };
    ratingStats.forEach((stat) => {
      ratingDistribution[stat.rating] = stat._count.rating;
    });

    res.json({
      reviews,
      stats: {
        averageRating: avgRating._avg.rating || 0,
        totalReviews: total,
        ratingDistribution,
      },
      pagination: {
        page: parseInt(page),
        limit: take,
        total,
        pages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    console.error("Error Getting Products Reviews: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route GET /api/products/:productId/reviews/can-review
// @desc check if user can review or not
export const canUserReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    // check if user already reviewed that product
    const existingReview = await prisma.review.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: parseInt(productId),
        },
      },
    });

    if (existingReview) {
      return res.json({
        canReview: false,
        reason: "already_reviewed",
        message: "You have already reviewed this product",
        existingReview,
      });
    }

    const hasPurchased = await hasUserPurchasedProduct(userId, productId);
    if (!hasPurchased) {
      return res.json({
        canReview: false,
        reason: "not_purchased",
        message: "You can only review products you have already purchased",
      });
    }
    res.json({
      canReview: true,
      message: "You can review this product",
    });
  } catch (error) {
    console.error("Error Checking User can review: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//@route POST /api/products/:productId/reviews
//@desc create a review
export const createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { rating, title, comment } = req.body;

    //validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    if (!comment) {
      return res.status(400).json({ message: "You have to write the comment" });
    }

    const existingReview = await prisma.review.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: parseInt(productId),
        },
      },
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this product",
      });
    }

    // Check if user purchased the product
    const hasPurchased = await hasUserPurchasedProduct(userId, productId);

    if (!hasPurchased) {
      return res.status(403).json({
        message: "You can only review products you have purchased",
      });
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        rating: parseInt(rating),
        title: title?.trim() || null,
        comment: comment.trim(),
        userId,
        productId: parseInt(productId),
        isVerifiedPurchase: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    // update product rating and review count
    const stats = await prisma.review.aggregate({
      where: {
        productId: parseInt(productId),
        isApproved: true,
      },
      _avg: { rating: true },
      _count: { rating: true },
    });
    await prisma.product.update({
      where: {
        id: parseInt(productId),
      },
      data: {
        rating: stats._avg.rating || 0,
        reviewCount: stats._count.rating || 0,
      },
    });

    res.status(201).json({
      message: "Review Submitted Successfully",
      review,
    });
  } catch (error) {
    console.error("Error Creating Review: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//@route PUT /api/reviews/:reviewId
//@desc Update own review
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;
    const { rating, title, comment } = req.body;

    //find the review
    const review = await prisma.review.findUnique({
      where: {
        id: parseInt(reviewId),
      },
    });
    if (!review) {
      return res.status(404).json({ message: "Review Not Found" });
    }
    if (review.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Not Authourized to edit this review" });
    }

    const updatedReview = await prisma.review.update({
      where: { id: parseInt(reviewId) },
      data: {
        rating: rating ? parseInt(rating) : undefined,
        title: title !== undefined ? title.trim() || null : undefined,
        comment: comment ? comment.trim() : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
    // Recalculate product rating
    const stats = await prisma.review.aggregate({
      where: {
        productId: review.productId,
        isApproved: true,
      },
      _avg: { rating: true },
    });

    await prisma.product.update({
      where: { id: review.productId },
      data: { rating: stats._avg.rating || 0 },
    });

    res.json({
      message: "Review updated successfully",
      review: updatedReview,
    });
  } catch (error) {
    console.error("Update review error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @route DELETE /api/reviews/:reviewId
// @desc Delete own review

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await prisma.review.findUnique({
      where: {
        id: parseInt(reviewId),
      },
    });

    if (!review) {
      return res.status(404).json({ message: "Review Not Found" });
    }

    if (review.userId !== userId && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Not Authorized " });
    }

    const productId = review.productId;

    await prisma.review.delete({
      where: {
        id: parseInt(reviewId),
      },
    });

    //update product stats
    const stats = await prisma.review.aggregate({
      where: { productId, isApproved: true },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: stats._avg.rating || 0,
        reviewCount: stats._count.rating || 0,
      },
    });

    res.json({ message: "Review Deleted Successfully" });
  } catch (error) {
    console.error("Delete review error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
