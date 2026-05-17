import prisma from "../src/lib/prisma.js";

const SUPABASE_URL =
  "https://gajvwlzggpkehfuqwrzx.supabase.co/storage/v1/object/public";

function toSupabaseUrl(oldPath) {
  if (!oldPath) return oldPath;
  const parts = oldPath.replace(/^\/?uploads\//, "").split("/");
  const bucket = parts[0];
  const filePath = parts.slice(1).join("/");
  return `${SUPABASE_URL}/${bucket}/${filePath}`;
}

async function main() {
  console.log("🚀 Migrating image URLs to Supabase...");

  // 1. Products
  const products = await prisma.product.findMany();
  for (const product of products) {
    const newImage = toSupabaseUrl(product.image);
    const newImages = product.images.map((img) => toSupabaseUrl(img));
    await prisma.product.update({
      where: { id: product.id },
      data: {
        image: newImage,
        images: newImages,
      },
    });
  }
  console.log(`✅ Updated ${products.length} products.`);

  // 2. Categories
  const categories = await prisma.category.findMany();
  for (const cat of categories) {
    if (cat.image) {
      const newImage = toSupabaseUrl(cat.image);
      await prisma.category.update({
        where: { id: cat.id },
        data: { image: newImage },
      });
    }
  }
  console.log(`✅ Updated ${categories.length} categories.`);

  // 3. Collections
  const collections = await prisma.collection.findMany();
  for (const col of collections) {
    if (col.image) {
      const newImage = toSupabaseUrl(col.image);
      await prisma.collection.update({
        where: { id: col.id },
        data: { image: newImage },
      });
    }
  }
  console.log(`✅ Updated ${collections.length} collections.`);

  console.log("🎉 Migration complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
