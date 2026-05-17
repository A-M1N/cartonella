import prisma from "../lib/prisma.js";

// Generate Unique Order No.
const generateOrderNumber = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const random = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0");
  return `ORD-${year}${month}${day}-${random}`;
};

// @route   POST /api/orders
// @desc    Create a new order
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingFee,
      tax,
      discount,
      couponCode,
      total,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No Order Items Provided" });
    }

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({ message: "Missing Required Fields" });
    }

    const productIds = items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== items.length) {
      return res.status(400).json({ message: "Some Products Not Found" });
    }

    //check stock
    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficent Stock for ${product.name}. Avaliable : ${product.stock}`,
        });
      }
    }
    // validate coupon
    let validCoupon = null;
    if (couponCode) {
      validCoupon = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase() },
      });

      if (!validCoupon || !validCoupon.isActive) {
        return res.status(400).json({ message: "Invalid Coupon Code" });
      }

      // check if expired
      if (validCoupon.endDate && new Date() > validCoupon.endDate) {
        return res.status(400).json({ message: "Coupon has Expired" });
      }

      //check usage limit
      if (
        validCoupon.usageLimit &&
        validCoupon.usageCount >= validCoupon.usageLimit
      ) {
        return res.status(400).json({ message: "Coupon Usage Limit Reached" });
      }

      //check minimum order amount
      if (validCoupon.minOrderAmount && subtotal < validCoupon.minOrderAmount) {
        return res.status(400).json({
          message: `Minimum Order Amount of $ ${validCoupon.minOrderAmount} required`,
        });
      }
    }

    //create the Order
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: req.user?.id || null,
        guestEmail: req.user ? null : shippingAddress.email,
        shippingFirstName: shippingAddress.firstName,
        shippingLastName: shippingAddress.lastName,
        shippingEmail: shippingAddress.email,
        shippingPhone: shippingAddress.phone,
        shippingAddress: shippingAddress.address,
        shippingCity: shippingAddress.city,
        shippingState: shippingAddress.state,
        shippingPostalCode: shippingAddress.postalCode,
        shippingCountry: shippingAddress.country,
        paymentMethod,
        subtotal,
        shippingFee,
        tax,
        discount,
        total,
        couponCode: couponCode?.toUpperCase() || null,
        items: {
          create: items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return {
              productId: item.productId,
              name: product.name,
              image: product.image,
              price: product.price,
              quantity: item.quantity,
            };
          }),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // update coupon usage count
    if (validCoupon) {
      await prisma.coupon.update({
        where: { code: validCoupon.code },
        data: { usageCount: { increment: 1 } },
      });
    }

    // reduce product stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }
    res.status(201).json({
      success: true,
      message: "Order Created Successfully",
      order,
    });
  } catch (error) {
    console.error("Create Order Error: ", error);
    res.status(500).json({
      message: " Server Error",
      error: error.message,
    });
  }
};

// @route GET /api/orders/:id
// @desc Get Order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    //validate id
    const orderId = parseInt(id);
    if (isNaN(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        coupon: true,
      },
    });
    if (!order) {
      return res.status(404).json({ message: "Order Not Found" });
    }
    // check if the user owns the order or is Admin
    if (order.userId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Not Authorized" });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get Order Error: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//@route GET /api/orders/my-orders
//@desc Get logged in user's orders
export const getMyOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const where = { userId: req.user.id };
    if (status) {
      where.status = status.toUpperCase();
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
      }),
      prisma.order.count({ where }),
    ]);

    res.json({
      success: true,
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Get My Orders Error :", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//@route GET /api/orders/
//@desc Get All Orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;

    const where = {};

    if (status) {
      where.status = status.toUpperCase();
    }

    if (search) {
      where.OR = [
        { orderNumber: { contains: search, mode: "insensitive" } },
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } },
      ];
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  price: true,
                },
              },
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
      }),
      prisma.order.count({ where }),
    ]);

    res.json({
      success: true,
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Get All Orders Error: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//@route PUT /api/orders/:id/pay
//@desc update order to PAID

export const updateOrderToPaid = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentId, payerId, status } = req.body;

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
    });

    if (!order) {
      return res.status(404).json({ message: "Order Not Found" });
    }
    if (order.userId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Not Authorized" });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        paymentStatus: "COMPLETED",
        paymentId,
        payerId,
        status: "CONFIRMED",
        paidAt: new Date(),
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.json({
      success: true,
      message: "Payment Successful",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Update Order to Paid Error: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//@route PUT/api/orders/:id/status
//@desc Update order status (Admin)

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, trackingNumber, trackingUrl, adminNotes } = req.body;

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
    });

    if (!order) {
      return res.status(404).json({ message: "Order Not Found " });
    }
    const updateData = {
      status: status.toUpperCase(),
    };

    if (trackingNumber) updateData.trackingNumber = trackingNumber;
    if (trackingUrl) updateData.trackingUrl = trackingUrl;
    if (adminNotes) updateData.adminNotes = adminNotes;

    // set timestapms based on status
    if (status === "DELIVERED") {
      updateData.deliveredAt = new Date();
    } else if (status === "CANCELLED") {
      updateData.cancelledAt = new Date();
    }

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        items: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json({
      success: true,
      message: `Order Status Updated To ${status}`,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Update Order Status Error : ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route PUT /api/orders/:id/cancel
// @desc Cancel Order
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: { items: true },
    });

    if (!order) {
      return res.status(404).json({ message: "Order Not Found" });
    }

    // check if its the right user to cancel
    if (order.userId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Not Authorized" });
    }

    if (!["PENDING", "CONFIRMED"].includes(order.status)) {
      return res.status(400).json({
        message: "Order cannot be cancelled at this stage",
      });
    }

    // restock product stock
    for (const item of order.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { increment: item.quantity } },
      });
    }

    // update the order
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        status: "CANCELLED",
        cancelledAt: new Date(),
        notes: reason || "Cancelled by User",
      },
    });

    res.json({
      success: true,
      order: updatedOrder,
      message: "Order Cancelled Successfully",
    });
  } catch (error) {
    console.error("Cancel Order Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//@route POST /api/orders/validate-coupon
//@desc validate a coupon code
export const validateCoupon = async (req, res) => {
  try {
    const { code, subtotal } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Coupon Code is required " });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!coupon) {
      return res.status(404).json({ message: "Invalid Coupon Code" });
    }

    if (!coupon.isActive) {
      return res.status(400).json({ message: "Coupon is not active" });
    }

    if (coupon.endDate && new Date() > coupon.endDate) {
      return res.status(400).json({ message: "Coupon has expired" });
    }
    if (coupon.startDate && new Date() < coupon.startDate) {
      return res.status(400).json({ message: "Coupon is not yet valid" });
    }

    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      return res.status(400).json({ message: "Coupon usage limit reached" });
    }
    if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) {
      return res.status(400).json({
        message: `Minimum Order of $ ${coupon.minOrderAmount.toFixed(2)} required`,
      });
    }

    let discount = 0;
    let discountLabel = "";

    switch (coupon.type) {
      case "FIXED":
        discount = Math.min(coupon.value, subtotal);
        discountLabel = `$ ${coupon.value.toFixed(2)} Off`;
        break;
      case "FREE_SHIPPING":
        discountLabel = "Free Shipping";
        break;
      case "PERCENTAGE":
        discount = (subtotal * coupon.value) / 100;
        if (coupon.maxDiscount && discount > coupon.maxDiscount) {
          discount = coupon.maxDiscount;
        }
        discountLabel = `${coupon.value}% Off`;
        break;
    }

    res.json({
      success: true,
      coupon: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        label: discountLabel,
        discount,
        description: coupon.description,
      },
    });
  } catch (error) {
    console.error("Validate Coupon Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//@route GET /api/orders/paypal-client-id
//@desc Get PayPal Client ID

export const getPayPalClientId = async (req, res) => {
  res.json({
    clientId: process.env.PAYPAL_CLIENT_ID,
  });
};
