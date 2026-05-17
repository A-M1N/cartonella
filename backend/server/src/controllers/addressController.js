import prisma from "../lib/prisma.js";

export const getAddresses = async (req, res) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: req.user.id },
      orderBy: { isDefault: "desc" },
    });
    res.json({ addresses });
  } catch (error) {
    console.error("Error get Addresses: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createAddress = async (req, res) => {
  try {
    const { label, address, city, state, postalCode, country, isDefault } =
      req.body;

    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: req.user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const newAddress = await prisma.address.create({
      data: {
        label,
        address,
        city,
        state,
        postalCode,
        country,
        isDefault: isDefault || false,
        userId: req.user.id,
      },
    });

    res.status(201).json({ address: newAddress });
  } catch (error) {
    console.error("Create Address Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { label, address, city, state, postalCode, country, isDefault } =
      req.body;

    if (isDefault) {
      await prisma.address.updateMany({
        where: {
          userId: req.user.id,
          isDefault: true,
          id: { not: parseInt(id) },
        },
        data: { isDefault: false },
      });
    }

    const updatedAddress = await prisma.address.update({
      where: { id: parseInt(id) },
      data: { label, address, city, state, postalCode, country, isDefault },
    });

    res.json({ address: updatedAddress });
  } catch (error) {
    console.error("Update Address Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.address.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Address deleted" });
  } catch (error) {
    console.error("Delete Address Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
