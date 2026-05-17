import prisma from "../lib/prisma.js";

export const getAdminStats = async (req, res) => {
  try {
    const [
      usersCount,
      productsCount,
      ordersCount,
      revenueAggregate,
      latestOrders,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: {
          total: true,
        },
      }),
      prisma.order.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          items: true,
        },
      }),
    ]);

    res.json({
      success: true,
      stats: {
        usersCount,
        productsCount,
        ordersCount,
        revenue: revenueAggregate._sum.total || 0,
      },
      latestOrders,
    });
  } catch (error) {
    console.error("Get Admin Stats Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const where = {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          role: true,
          createdAt: true,
          _count: { select: { orders: true, reviews: true } },
        },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      success: true,
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Get Admin Users Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
