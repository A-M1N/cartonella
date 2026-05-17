import prisma from "../lib/prisma.js";

const getNextMidnight = () => {
  const now = new Date();
  const nextMidnight = new Date(now);

  nextMidnight.setHours(24, 0, 0, 0);

  return nextMidnight;
};

//@ POST /api/deals (Admin Only)
//@ desc create a new daily deal

export const createDailyDeal = async (req, res) => {
  try {
    const {
      productId,
      dealPrice,
      activeDate,
      expiresAt,
      freeShipping = false,
      freeGift = false,
      giftDescription,
    } = req.body;

    if (!productId || !dealPrice || !activeDate || !expiresAt) {
      return res.status(400).json({
        message:
          "Please provide productId, dealPrice, activeDate, and expiresAt",
      });
    }

    //Get the product from db

    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    // Parse the active date (just the date part)
    const parsedActiveDate = new Date(activeDate);
    parsedActiveDate.setHours(0, 0, 0, 0);

    //check if deal already exists for this data

    const existingDeal = await prisma.dailyDeal.findUnique({
      where: { activeDate: parsedActiveDate },
    });

    if (existingDeal) {
      return res.status(400).json({
        message:
          "A deal already exists for this date.Delete it first or choose another date.",
      });
    }

    const deal = await prisma.dailyDeal.create({
      data: {
        productId: parseInt(productId),
        dealPrice: parseFloat(dealPrice),
        originalPrice: product.price,
        savings: product.price - parseFloat(dealPrice),
        activeDate: parsedActiveDate,
        expiresAt: new Date(expiresAt),
        freeShipping,
        freeGift,
        giftDescription,
      },
      include: {
        product: true,
      },
    });

    res.status(201).json(deal);
  } catch (error) {
    console.error("Create daily deal error : ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//@ DELETE /api/deals/:id (Admin)
//@ desc delete a daily deal

export const deleteDailyDeal = async (req, res) => {
  try {
    const { id } = req.params;

    const deal = await prisma.dailyDeal.findUnique({
      where: { id: parseInt(id) },
    });

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    await prisma.dailyDeal.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Deal Deleted Successfully" });
  } catch (error) {
    console.error("Delete Daily Deal Error : ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//@ GET /api/deals/today
//@ desc Get Deal of the day
export const getDealOfDay = async (req, res) => {
  try {
    const deal = await prisma.dailyDeal.findFirst({
      where: {
        isActive: true,
      },
      orderBy: {
        activeDate: "desc",
      },
      include: {
        product: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    if (!deal) {
      return res.status(404).json({ message: "No Active Deal Today" });
    }

    const dynamicExpiresAt = getNextMidnight();

    const timeRemaining = Math.max(dynamicExpiresAt.getTime() - Date.now(), 0);

    res.json({
      id: deal.id,
      product: deal.product,
      dealPrice: deal.dealPrice,
      originalPrice: deal.originalPrice,
      savings: deal.savings,
      freeShipping: deal.freeShipping,
      freeGift: deal.freeGift,
      giftDescription: deal.giftDescription,
      expiresAt: dynamicExpiresAt,
      serverTime: new Date(),
      timeRemaining: {
        hours: Math.floor(timeRemaining / (1000 * 60 * 60)),
        minutes: Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeRemaining % (1000 * 60)) / 1000),
        totalMs: timeRemaining,
      },
    });
  } catch (error) {
    console.error("Get Daily Deal Error: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};
