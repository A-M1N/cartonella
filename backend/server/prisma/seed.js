import prisma from "../src/lib/prisma.js";

async function main() {
  console.log("🔍 Finding parent categories...");

  // 1. Find all needed Level 2 parents
  const videoGames = await prisma.category.findUnique({
    where: { slug: "video-games" },
  });
  const giftCards = await prisma.category.findUnique({
    where: { slug: "gift-cards" },
  });
  const subscriptions = await prisma.category.findUnique({
    where: { slug: "subscriptions" },
  });
  const mensClothing = await prisma.category.findUnique({
    where: { slug: "mens-clothing" },
  });
  const womensClothing = await prisma.category.findUnique({
    where: { slug: "womens-clothing" },
  });
  const kidsClothing = await prisma.category.findUnique({
    where: { slug: "kids-clothing" },
  });
  const shoes = await prisma.category.findUnique({ where: { slug: "shoes" } });
  const perfumes = await prisma.category.findUnique({
    where: { slug: "perfumes" },
  });

  // Safety check
  const parents = {
    videoGames,
    giftCards,
    subscriptions,
    mensClothing,
    womensClothing,
    kidsClothing,
    shoes,
    perfumes,
  };
  for (const [key, val] of Object.entries(parents)) {
    if (!val) throw new Error(`Parent category not found: ${key}`);
  }

  console.log("✅ All parent categories found.\n");

  // 2. Define all Level 3 categories that must exist (matching menuData)
  const newCategories = [
    // Video Games – game titles
    { name: "FIFA", slug: "fifa", parentId: videoGames.id },
    { name: "Battlefield", slug: "battlefield", parentId: videoGames.id },
    { name: "Arc Raiders", slug: "arcraiders", parentId: videoGames.id },
    { name: "Call of Duty", slug: "callofduty", parentId: videoGames.id },
    {
      name: "Escape from Tarkov",
      slug: "escapefromtarkov",
      parentId: videoGames.id,
    },

    // Gift Cards – replace generic "Riot Games" with two specific ones
    // (deletes old "giftcards-riot" if it still exists)
    // These will be inserted if missing
    {
      name: "League Of Legends RP",
      slug: "giftcards-leagueoflegends",
      parentId: giftCards.id,
    },
    {
      name: "Valorant Points",
      slug: "giftcards-valorantpoints",
      parentId: giftCards.id,
    },

    // Subscriptions
    { name: "Spotify", slug: "spotify", parentId: subscriptions.id },
    { name: "Netflix", slug: "netflix", parentId: subscriptions.id },
    { name: "Amazon Prime", slug: "amazon-prime", parentId: subscriptions.id },
    { name: "Discord Nitro", slug: "discord", parentId: subscriptions.id },

    // Men's Clothing
    { name: "Suits", slug: "mens-suits", parentId: mensClothing.id }, // 👈 missing
    { name: "Jackets", slug: "mens-jackets", parentId: mensClothing.id }, // 👈 missing
    { name: "Hoodies", slug: "mens-hoodies", parentId: mensClothing.id },

    // Women's Clothing
    { name: "Dresses", slug: "womens-dresses", parentId: womensClothing.id },
    { name: "Skirts", slug: "womens-skirts", parentId: womensClothing.id },
    { name: "T-Shirts", slug: "womens-tshirts", parentId: womensClothing.id },

    // Kids
    { name: "Caps", slug: "kids-caps", parentId: kidsClothing.id },
    { name: "T-Shirts", slug: "kids-tshirts", parentId: kidsClothing.id },

    // Shoes
    { name: "Sneakers", slug: "sneakers", parentId: shoes.id },
    { name: "Slippers", slug: "slippers", parentId: shoes.id },
    { name: "Runners", slug: "runner", parentId: shoes.id },

    // Perfumes
    { name: "Victoria Secret", slug: "victoriasecret", parentId: perfumes.id },
    {
      name: "Bath and Body Works",
      slug: "bath-and-body-works",
      parentId: perfumes.id,
    },
    { name: "Gucci", slug: "gucci", parentId: perfumes.id },
  ];

  // 4. Insert all categories (skip if already present)
  await prisma.category.createMany({
    data: newCategories.map((c) => ({ ...c, level: 3 })),
    skipDuplicates: true,
  });

  console.log(
    `✅ Created/verified ${newCategories.length} Level 3 categories.`,
  );
  console.log("🎉 All categories now match the frontend menuData.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
