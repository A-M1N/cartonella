// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data in correct order (respecting foreign keys)
  console.log("🗑️ Clearing existing data...");

  await prisma.dailyDeal.deleteMany();
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.collection.deleteMany();

  console.log("✅ Cleared existing data");

  // ============================================
  // CREATE MAIN CATEGORIES (Level 1)
  // ============================================

  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
      slug: "electronics",
      image: "/uploads/categories/electronics.jpg",
      level: 1,
      isFeatured: true,
    },
  });

  const digitalProducts = await prisma.category.create({
    data: {
      name: "Digital Products",
      slug: "digital-products",
      image: "/uploads/categories/digital-products.jpg",
      level: 1,
      isFeatured: true,
    },
  });

  const clothing = await prisma.category.create({
    data: {
      name: "Clothing",
      slug: "clothing",
      image: "/uploads/categories/clothing.jpg",
      level: 1,
      isFeatured: true,
    },
  });

  console.log("✅ Created main categories (Level 1)");

  // ============================================
  // CREATE SUBCATEGORIES (Level 2)
  // ============================================

  // Electronics subcategories
  const laptops = await prisma.category.create({
    data: {
      name: "Laptops",
      slug: "laptops",
      image: "/uploads/categories/laptops.jpg",
      level: 2,
      parentId: electronics.id,
      isFeatured: true,
    },
  });

  const phones = await prisma.category.create({
    data: {
      name: "Phones",
      slug: "phones",
      image: "/uploads/categories/phones.jpg",
      level: 2,
      parentId: electronics.id,
      isFeatured: true,
    },
  });

  const pc = await prisma.category.create({
    data: {
      name: "PC & Components",
      slug: "pc-components",
      image: "/uploads/categories/pc.jpg",
      level: 2,
      parentId: electronics.id,
      isFeatured: true,
    },
  });

  const tv = await prisma.category.create({
    data: {
      name: "TV",
      slug: "tv",
      image: "/uploads/categories/tv.jpg",
      level: 2,
      parentId: electronics.id,
    },
  });

  const camera = await prisma.category.create({
    data: {
      name: "Camera",
      slug: "camera",
      image: "/uploads/categories/camera.jpg",
      level: 2,
      parentId: electronics.id,
    },
  });

  const smartWatch = await prisma.category.create({
    data: {
      name: "Smart Watch",
      slug: "smart-watch",
      image: "/uploads/categories/smartwatch.jpg",
      level: 2,
      parentId: electronics.id,
    },
  });

  // Digital Products subcategories
  const videoGames = await prisma.category.create({
    data: {
      name: "Video Games",
      slug: "video-games",
      image: "/uploads/categories/games.jpg",
      level: 2,
      parentId: digitalProducts.id,
      isFeatured: true,
    },
  });

  const giftCards = await prisma.category.create({
    data: {
      name: "Gift Cards",
      slug: "gift-cards",
      image: "/uploads/categories/giftcards.jpg",
      level: 2,
      parentId: digitalProducts.id,
    },
  });

  const software = await prisma.category.create({
    data: {
      name: "Software",
      slug: "software",
      image: "/uploads/categories/software.jpg",
      level: 2,
      parentId: digitalProducts.id,
    },
  });

  const subscriptions = await prisma.category.create({
    data: {
      name: "Subscriptions",
      slug: "subscriptions",
      image: "/uploads/categories/subscriptions.jpg",
      level: 2,
      parentId: digitalProducts.id,
    },
  });

  // Clothing subcategories
  const mensClothing = await prisma.category.create({
    data: {
      name: "Men's Clothing",
      slug: "mens-clothing",
      image: "/uploads/categories/mens.jpg",
      level: 2,
      parentId: clothing.id,
      isFeatured: true,
    },
  });

  const womensClothing = await prisma.category.create({
    data: {
      name: "Women's Clothing",
      slug: "womens-clothing",
      image: "/uploads/categories/womens.jpg",
      level: 2,
      parentId: clothing.id,
      isFeatured: true,
    },
  });

  const kidsClothing = await prisma.category.create({
    data: {
      name: "Kids",
      slug: "kids-clothing",
      image: "/uploads/categories/kids.jpg",
      level: 2,
      parentId: clothing.id,
    },
  });

  const shoes = await prisma.category.create({
    data: {
      name: "Shoes",
      slug: "shoes",
      image: "/uploads/categories/shoes.jpg",
      level: 2,
      parentId: clothing.id,
    },
  });

  const perfumes = await prisma.category.create({
    data: {
      name: "Perfumes",
      slug: "perfumes",
      image: "/uploads/categories/perfumes.jpg",
      level: 2,
      parentId: clothing.id,
    },
  });

  console.log("✅ Created subcategories (Level 2)");

  // ============================================
  // CREATE BRANDS/TYPES (Level 3)
  // ============================================

  // Laptop brands
  const appleLaptops = await prisma.category.create({
    data: {
      name: "Apple",
      slug: "laptops-apple",
      level: 3,
      parentId: laptops.id,
    },
  });
  const alienwareLaptops = await prisma.category.create({
    data: {
      name: "Alienware",
      slug: "laptops-alienware",
      level: 3,
      parentId: laptops.id,
    },
  });
  const asusLaptops = await prisma.category.create({
    data: {
      name: "ASUS",
      slug: "laptops-asus",
      level: 3,
      parentId: laptops.id,
    },
  });
  const dellLaptops = await prisma.category.create({
    data: {
      name: "Dell",
      slug: "laptops-dell",
      level: 3,
      parentId: laptops.id,
    },
  });
  const hpLaptops = await prisma.category.create({
    data: { name: "HP", slug: "laptops-hp", level: 3, parentId: laptops.id },
  });
  const lenovoLaptops = await prisma.category.create({
    data: {
      name: "Lenovo",
      slug: "laptops-lenovo",
      level: 3,
      parentId: laptops.id,
    },
  });
  const msiLaptops = await prisma.category.create({
    data: { name: "MSI", slug: "laptops-msi", level: 3, parentId: laptops.id },
  });

  // Phone brands
  const applePhones = await prisma.category.create({
    data: {
      name: "Apple",
      slug: "phones-apple",
      level: 3,
      parentId: phones.id,
    },
  });
  const samsungPhones = await prisma.category.create({
    data: {
      name: "Samsung",
      slug: "phones-samsung",
      level: 3,
      parentId: phones.id,
    },
  });
  const oppoPhones = await prisma.category.create({
    data: { name: "Oppo", slug: "phones-oppo", level: 3, parentId: phones.id },
  });
  const xiaomiPhones = await prisma.category.create({
    data: {
      name: "Xiaomi",
      slug: "phones-xiaomi",
      level: 3,
      parentId: phones.id,
    },
  });
  const honorPhones = await prisma.category.create({
    data: {
      name: "Honor",
      slug: "phones-honor",
      level: 3,
      parentId: phones.id,
    },
  });

  // PC Component categories
  const gpuCategory = await prisma.category.create({
    data: { name: "Graphics Cards", slug: "pc-gpu", level: 3, parentId: pc.id },
  });
  const cpuCategory = await prisma.category.create({
    data: { name: "Processors", slug: "pc-cpu", level: 3, parentId: pc.id },
  });
  const motherboardCategory = await prisma.category.create({
    data: {
      name: "Motherboards",
      slug: "pc-motherboard",
      level: 3,
      parentId: pc.id,
    },
  });
  const ramCategory = await prisma.category.create({
    data: { name: "RAM", slug: "pc-ram", level: 3, parentId: pc.id },
  });
  const monitorCategory = await prisma.category.create({
    data: { name: "Monitors", slug: "pc-monitor", level: 3, parentId: pc.id },
  });
  const mouseCategory = await prisma.category.create({
    data: { name: "Mouse", slug: "pc-mouse", level: 3, parentId: pc.id },
  });
  const keyboardCategory = await prisma.category.create({
    data: { name: "Keyboards", slug: "pc-keyboard", level: 3, parentId: pc.id },
  });
  const headsetCategory = await prisma.category.create({
    data: { name: "Headsets", slug: "pc-headset", level: 3, parentId: pc.id },
  });
  const microphoneCategory = await prisma.category.create({
    data: {
      name: "Microphones",
      slug: "pc-microphone",
      level: 3,
      parentId: pc.id,
    },
  });
  const chairCategory = await prisma.category.create({
    data: {
      name: "Gaming Chairs",
      slug: "pc-chair",
      level: 3,
      parentId: pc.id,
    },
  });
  const mousepadCategory = await prisma.category.create({
    data: { name: "Mousepads", slug: "pc-mousepad", level: 3, parentId: pc.id },
  });
  const ssdCategory = await prisma.category.create({
    data: { name: "SSD & Storage", slug: "pc-ssd", level: 3, parentId: pc.id },
  });

  // TV brands
  const samsungTV = await prisma.category.create({
    data: { name: "Samsung", slug: "tv-samsung", level: 3, parentId: tv.id },
  });
  const lgTV = await prisma.category.create({
    data: { name: "LG", slug: "tv-lg", level: 3, parentId: tv.id },
  });
  const sonyTV = await prisma.category.create({
    data: { name: "Sony", slug: "tv-sony", level: 3, parentId: tv.id },
  });
  const hisenseTV = await prisma.category.create({
    data: { name: "Hisense", slug: "tv-hisense", level: 3, parentId: tv.id },
  });

  // Camera brands
  const canonCamera = await prisma.category.create({
    data: {
      name: "Canon",
      slug: "camera-canon",
      level: 3,
      parentId: camera.id,
    },
  });
  const nikonCamera = await prisma.category.create({
    data: {
      name: "Nikon",
      slug: "camera-nikon",
      level: 3,
      parentId: camera.id,
    },
  });
  const fujifilmCamera = await prisma.category.create({
    data: {
      name: "Fujifilm",
      slug: "camera-fujifilm",
      level: 3,
      parentId: camera.id,
    },
  });
  const sonyCamera = await prisma.category.create({
    data: { name: "Sony", slug: "camera-sony", level: 3, parentId: camera.id },
  });

  // Smart Watch brands
  const appleWatch = await prisma.category.create({
    data: {
      name: "Apple",
      slug: "smartwatch-apple",
      level: 3,
      parentId: smartWatch.id,
    },
  });
  const googleWatch = await prisma.category.create({
    data: {
      name: "Google",
      slug: "smartwatch-google",
      level: 3,
      parentId: smartWatch.id,
    },
  });
  const samsungWatch = await prisma.category.create({
    data: {
      name: "Samsung",
      slug: "smartwatch-samsung",
      level: 3,
      parentId: smartWatch.id,
    },
  });
  const huaweiWatch = await prisma.category.create({
    data: {
      name: "Huawei",
      slug: "smartwatch-huawei",
      level: 3,
      parentId: smartWatch.id,
    },
  });

  // Video Games platforms
  const steamGames = await prisma.category.create({
    data: {
      name: "Steam",
      slug: "games-steam",
      level: 3,
      parentId: videoGames.id,
    },
  });
  const eaGames = await prisma.category.create({
    data: { name: "EA", slug: "games-ea", level: 3, parentId: videoGames.id },
  });
  const battlenetGames = await prisma.category.create({
    data: {
      name: "Battle.net",
      slug: "games-battlenet",
      level: 3,
      parentId: videoGames.id,
    },
  });

  // Gift Card types
  const steamCards = await prisma.category.create({
    data: {
      name: "Steam",
      slug: "giftcards-steam",
      level: 3,
      parentId: giftCards.id,
    },
  });
  const riotCards = await prisma.category.create({
    data: {
      name: "Riot Games",
      slug: "giftcards-riot",
      level: 3,
      parentId: giftCards.id,
    },
  });
  const amazonCards = await prisma.category.create({
    data: {
      name: "Amazon",
      slug: "giftcards-amazon",
      level: 3,
      parentId: giftCards.id,
    },
  });
  const appleCards = await prisma.category.create({
    data: {
      name: "Apple",
      slug: "giftcards-apple",
      level: 3,
      parentId: giftCards.id,
    },
  });
  const googleCards = await prisma.category.create({
    data: {
      name: "Google Play",
      slug: "giftcards-google",
      level: 3,
      parentId: giftCards.id,
    },
  });

  // Software categories
  const osCategory = await prisma.category.create({
    data: {
      name: "Operating Systems",
      slug: "software-os",
      level: 3,
      parentId: software.id,
    },
  });
  const antivirusCategory = await prisma.category.create({
    data: {
      name: "Antivirus",
      slug: "software-antivirus",
      level: 3,
      parentId: software.id,
    },
  });
  const officeCategory = await prisma.category.create({
    data: {
      name: "Office",
      slug: "software-office",
      level: 3,
      parentId: software.id,
    },
  });
  const vpnCategory = await prisma.category.create({
    data: {
      name: "VPN",
      slug: "software-vpn",
      level: 3,
      parentId: software.id,
    },
  });

  console.log("✅ Created brands/types (Level 3)");

  // ============================================
  // CREATE COLLECTIONS (Hero Cards)
  // ============================================

  await prisma.collection.createMany({
    data: [
      {
        name: "Gaming",
        slug: "gaming",
        description: "Level up your gaming experience",
        image: "/uploads/collections/gaming.jpg",
        label: "HOT",
        labelColor: "#ef4444",
        displayOrder: 1,
        isActive: true,
      },
      {
        name: "Technology",
        slug: "technology",
        description: "Latest tech gadgets",
        image: "/uploads/collections/technology.jpg",
        label: "NEW",
        labelColor: "#3b82f6",
        displayOrder: 2,
        isActive: true,
      },
      {
        name: "Fashion",
        slug: "fashion",
        description: "Trendy fashion for everyone",
        image: "/uploads/collections/fashion.jpg",
        label: "TRENDING",
        labelColor: "#8b5cf6",
        displayOrder: 3,
        isActive: true,
      },
      {
        name: "Digital Lifestyle",
        slug: "digital-lifestyle",
        description: "Digital products for modern living",
        image: "/uploads/collections/digital.jpg",
        label: "POPULAR",
        labelColor: "#10b981",
        displayOrder: 4,
        isActive: true,
      },
    ],
  });

  console.log("✅ Created collections");

  // ============================================
  // CREATE PRODUCTS (2-3 per brand/category)
  // ============================================

  // ==================== LAPTOPS ====================

  // Apple Laptops (2)
  const macbookPro = await prisma.product.create({
    data: {
      name: "MacBook Pro 16-inch M3 Max",
      description: "The most powerful MacBook Pro ever with M3 Max chip.",
      price: 3499,
      image: "/uploads/products/macbook-pro-16.jpg",
      images: ["/uploads/products/macbook-pro-16.jpg"],
      stock: 25,
      rating: 4.9,
      reviewCount: 156,
      featured: true,
      isNew: true,
      brand: "Apple",
      categoryId: appleLaptops.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "MacBook Air 15-inch M3",
      description: "Impressively thin with all-day battery life.",
      price: 1299,
      oldPrice: 1399,
      image: "/uploads/products/macbook-air-15.jpg",
      images: ["/uploads/products/macbook-air-15.jpg"],
      stock: 40,
      rating: 4.8,
      reviewCount: 230,
      featured: false,
      onSale: true,
      brand: "Apple",
      categoryId: appleLaptops.id,
    },
  });

  // Alienware Laptops (2)
  await prisma.product.create({
    data: {
      name: "Alienware M18 R2 Gaming Laptop",
      description: "18-inch QHD+ 165Hz, Intel Core i9-14900HX, RTX 4090.",
      price: 3299,
      oldPrice: 3599,
      image: "/uploads/products/alienware-m18.jpg",
      images: ["/uploads/products/alienware-m18.jpg"],
      stock: 15,
      rating: 4.8,
      reviewCount: 89,
      featured: true,
      isNew: true,
      onSale: true,
      brand: "Alienware",
      categoryId: alienwareLaptops.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Alienware x16 R2",
      description: "Ultra-thin 16-inch gaming laptop with RTX 4080.",
      price: 2799,
      image: "/uploads/products/alienware-x16.jpg",
      images: ["/uploads/products/alienware-x16.jpg"],
      stock: 20,
      rating: 4.9,
      reviewCount: 67,
      featured: true,
      brand: "Alienware",
      categoryId: alienwareLaptops.id,
    },
  });

  // ASUS Laptops (2)
  await prisma.product.create({
    data: {
      name: "ASUS ROG Strix SCAR 18",
      description: "18-inch QHD+ 240Hz, Intel Core i9-14900HX, RTX 4090.",
      price: 3499,
      image: "/uploads/products/asus-rog-scar-18.jpg",
      images: ["/uploads/products/asus-rog-scar-18.jpg"],
      stock: 12,
      rating: 4.9,
      reviewCount: 78,
      featured: true,
      isNew: true,
      brand: "ASUS",
      categoryId: asusLaptops.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "ASUS ROG Zephyrus G16",
      description: "16-inch OLED 240Hz, AMD Ryzen 9, RTX 4070.",
      price: 1899,
      oldPrice: 2099,
      image: "/uploads/products/asus-zephyrus-g16.jpg",
      images: ["/uploads/products/asus-zephyrus-g16.jpg"],
      stock: 30,
      rating: 4.8,
      reviewCount: 145,
      onSale: true,
      brand: "ASUS",
      categoryId: asusLaptops.id,
    },
  });

  // Dell Laptops (2)
  await prisma.product.create({
    data: {
      name: "Dell XPS 15 (2024)",
      description: "15.6-inch 3.5K OLED, Intel Core Ultra 7.",
      price: 1899,
      oldPrice: 2099,
      image: "/uploads/products/dell-xps-15.jpg",
      images: ["/uploads/products/dell-xps-15.jpg"],
      stock: 35,
      rating: 4.7,
      reviewCount: 195,
      featured: true,
      onSale: true,
      brand: "Dell",
      categoryId: dellLaptops.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Dell G16 Gaming Laptop",
      description: "16-inch QHD+ 165Hz, Intel Core i7, RTX 4060.",
      price: 1299,
      oldPrice: 1499,
      image: "/uploads/products/dell-g16.jpg",
      images: ["/uploads/products/dell-g16.jpg"],
      stock: 40,
      rating: 4.4,
      reviewCount: 165,
      onSale: true,
      brand: "Dell",
      categoryId: dellLaptops.id,
    },
  });

  // HP Laptops (2)
  await prisma.product.create({
    data: {
      name: "HP Spectre x360 16",
      description: "16-inch 3K+ OLED touch, Intel Core Ultra 7.",
      price: 1649,
      image: "/uploads/products/hp-spectre-x360.jpg",
      images: ["/uploads/products/hp-spectre-x360.jpg"],
      stock: 28,
      rating: 4.7,
      reviewCount: 110,
      featured: true,
      isNew: true,
      brand: "HP",
      categoryId: hpLaptops.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "HP OMEN 17",
      description: "17.3-inch QHD 165Hz, Intel Core i7, RTX 4080.",
      price: 2199,
      oldPrice: 2499,
      image: "/uploads/products/hp-omen-17.jpg",
      images: ["/uploads/products/hp-omen-17.jpg"],
      stock: 22,
      rating: 4.6,
      reviewCount: 89,
      onSale: true,
      brand: "HP",
      categoryId: hpLaptops.id,
    },
  });

  // Lenovo Laptops (2)
  await prisma.product.create({
    data: {
      name: "Lenovo Legion Pro 7i",
      description: "16-inch WQXGA 240Hz, Intel Core i9, RTX 4090.",
      price: 3199,
      image: "/uploads/products/lenovo-legion-pro-7i.jpg",
      images: ["/uploads/products/lenovo-legion-pro-7i-2.jpg"],
      stock: 15,
      rating: 4.9,
      reviewCount: 95,
      featured: true,
      isNew: true,
      brand: "Lenovo",
      categoryId: lenovoLaptops.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Lenovo ThinkPad X1 Carbon Gen 12",
      description:
        "14-inch 2.8K OLED, Intel Core Ultra 7. Business excellence.",
      price: 1999,
      oldPrice: 2299,
      image: "/uploads/products/lenovo-x1-carbon.jpg",
      images: ["/uploads/products/lenovo-x1-carbon.jpg"],
      stock: 35,
      rating: 4.8,
      reviewCount: 180,
      onSale: true,
      brand: "Lenovo",
      categoryId: lenovoLaptops.id,
    },
  });

  // MSI Laptops (2)
  await prisma.product.create({
    data: {
      name: "MSI Titan 18 HX",
      description: "18-inch 4K Mini LED, Intel Core i9, RTX 4090.",
      price: 4299,
      image: "/uploads/products/msi-titan-18.jpg",
      images: ["/uploads/products/msi-titan-18.jpg"],
      stock: 10,
      rating: 4.9,
      reviewCount: 45,
      featured: true,
      isNew: true,
      brand: "MSI",
      categoryId: msiLaptops.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "MSI Raider GE78 HX",
      description: "17-inch QHD 240Hz, Intel Core i9, RTX 4080.",
      price: 2799,
      oldPrice: 2999,
      image: "/uploads/products/msi-raider-ge78.jpg",
      images: ["/uploads/products/msi-raider-ge78.jpg"],
      stock: 18,
      rating: 4.8,
      reviewCount: 78,
      onSale: true,
      brand: "MSI",
      categoryId: msiLaptops.id,
    },
  });

  console.log("✅ Created laptop products");

  // ==================== PHONES ====================

  // Apple Phones (2)
  await prisma.product.create({
    data: {
      name: "iPhone 15 Pro Max",
      description: "Titanium design. A17 Pro chip. 5x Telephoto camera.",
      price: 1199,
      image: "/uploads/products/iphone-15-pro-max.jpg",
      images: ["/uploads/products/iphone-15-pro-max.jpg"],
      stock: 60,
      rating: 4.9,
      reviewCount: 520,
      featured: true,
      isNew: true,
      brand: "Apple",
      categoryId: applePhones.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "iPhone 15",
      description: "Dynamic Island. 48MP camera. USB-C.",
      price: 799,
      oldPrice: 899,
      image: "/uploads/products/iphone-15.jpg",
      images: ["/uploads/products/iphone-15.jpg"],
      stock: 100,
      rating: 4.7,
      reviewCount: 450,
      onSale: true,
      brand: "Apple",
      categoryId: applePhones.id,
    },
  });

  // Samsung Phones (2)
  await prisma.product.create({
    data: {
      name: "Samsung Galaxy S24 Ultra",
      description: "Galaxy AI. Built-in S Pen. 200MP camera.",
      price: 1299,
      image: "/uploads/products/samsung-s24-ultra.jpg",
      images: ["/uploads/products/samsung-s24-ultra.jpg"],
      stock: 45,
      rating: 4.8,
      reviewCount: 290,
      featured: true,
      isNew: true,
      brand: "Samsung",
      categoryId: samsungPhones.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Samsung Galaxy Z Fold 5",
      description: "Unfold your world. 7.6-inch main display.",
      price: 1799,
      oldPrice: 1899,
      image: "/uploads/products/samsung-z-fold-5.jpg",
      images: ["/uploads/products/samsung-z-fold-5.jpg"],
      stock: 30,
      rating: 4.7,
      reviewCount: 165,
      onSale: true,
      brand: "Samsung",
      categoryId: samsungPhones.id,
    },
  });

  // Oppo Phones (2)
  await prisma.product.create({
    data: {
      name: "OPPO Find X7 Ultra",
      description: "Dual Periscope cameras. Hasselblad co-engineered.",
      price: 1199,
      image: "/uploads/products/oppo-find-x7-ultra.jpg",
      images: ["/uploads/products/oppo-find-x7-ultra.jpg"],
      stock: 25,
      rating: 4.7,
      reviewCount: 85,
      featured: true,
      isNew: true,
      brand: "Oppo",
      categoryId: oppoPhones.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "OPPO Reno 11 Pro",
      description: "Telephoto Portrait Expert. 80W SUPERVOOC.",
      price: 599,
      oldPrice: 699,
      image: "/uploads/products/oppo-reno-11-pro.jpg",
      images: ["/uploads/products/oppo-reno-11-pro.jpg"],
      stock: 45,
      rating: 4.5,
      reviewCount: 120,
      onSale: true,
      brand: "Oppo",
      categoryId: oppoPhones.id,
    },
  });

  // Xiaomi Phones (2)
  await prisma.product.create({
    data: {
      name: "Xiaomi 14 Ultra",
      description: "Leica Summilux lens. 1-inch sensor.",
      price: 1299,
      image: "/uploads/products/xiaomi-14-ultra.jpg",
      images: ["/uploads/products/xiaomi-14-ultra.jpg"],
      stock: 30,
      rating: 4.8,
      reviewCount: 95,
      featured: true,
      isNew: true,
      brand: "Xiaomi",
      categoryId: xiaomiPhones.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Redmi Note 13 Pro+",
      description: "200MP camera. 120W turbo charging.",
      price: 399,
      oldPrice: 449,
      image: "/uploads/products/redmi-note-13-pro.jpg",
      images: ["/uploads/products/redmi-note-13-pro.jpg"],
      stock: 80,
      rating: 4.5,
      reviewCount: 320,
      onSale: true,
      brand: "Xiaomi",
      categoryId: xiaomiPhones.id,
    },
  });

  // Honor Phones (2)
  await prisma.product.create({
    data: {
      name: "Honor Magic 6 Pro",
      description: "AI-powered flagship. Falcon camera.",
      price: 1099,
      image: "/uploads/products/honor-magic-6-pro.jpg",
      images: ["/uploads/products/honor-magic-6-pro.jpg"],
      stock: 28,
      rating: 4.7,
      reviewCount: 75,
      featured: true,
      isNew: true,
      brand: "Honor",
      categoryId: honorPhones.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Honor 200 Pro",
      description: "Portrait master. AI Emotion Portrait.",
      price: 699,
      oldPrice: 799,
      image: "/uploads/products/honor-200-pro.jpg",
      images: ["/uploads/products/honor-200-pro.jpg"],
      stock: 40,
      rating: 4.5,
      reviewCount: 95,
      onSale: true,
      brand: "Honor",
      categoryId: honorPhones.id,
    },
  });

  console.log("✅ Created phone products");

  // ==================== PC COMPONENTS ====================

  // GPUs (2)
  await prisma.product.create({
    data: {
      name: "NVIDIA GeForce RTX 4090",
      description: "24GB GDDR6X. Ada Lovelace. Ultimate performance.",
      price: 1599,
      image: "/uploads/products/rtx-4090.jpg",
      images: ["/uploads/products/rtx-4090.jpg"],
      stock: 15,
      rating: 4.9,
      reviewCount: 280,
      featured: true,
      brand: "NVIDIA",
      categoryId: gpuCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "AMD Radeon RX 7900 XTX",
      description: "24GB GDDR6. RDNA 3. 4K gaming champion.",
      price: 899,
      oldPrice: 999,
      image: "/uploads/products/rx-7900-xtx.jpg",
      images: ["/uploads/products/rx-7900-xtx.jpg"],
      stock: 20,
      rating: 4.7,
      reviewCount: 165,
      onSale: true,
      brand: "AMD",
      categoryId: gpuCategory.id,
    },
  });

  // CPUs (2)
  await prisma.product.create({
    data: {
      name: "Intel Core i9-14900K",
      description: "24 cores, 32 threads. Up to 6.0 GHz.",
      price: 569,
      oldPrice: 599,
      image: "/uploads/products/intel-i9-14900k.jpg",
      images: [
        "/uploads/products/intel-i9-14900k.jpg",
        "/uploads/products/intel-i9-14900k-1.jpg",
      ],
      stock: 30,
      rating: 4.8,
      reviewCount: 145,
      featured: true,
      onSale: true,
      brand: "Intel",
      categoryId: cpuCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "AMD Ryzen 9 7950X3D",
      description: "16 cores, 32 threads. 3D V-Cache. Best gaming CPU.",
      price: 699,
      image: "/uploads/products/amd-ryzen-9-7950x3d.jpg",
      images: ["/uploads/products/amd-ryzen-9-7950x3d.jpg"],
      stock: 25,
      rating: 4.9,
      reviewCount: 180,
      featured: true,
      brand: "AMD",
      categoryId: cpuCategory.id,
    },
  });

  // Motherboards (2)
  await prisma.product.create({
    data: {
      name: "ASUS ROG Maximus Z790 Hero",
      description: "Intel Z790. DDR5. PCIe 5.0.",
      price: 629,
      image: "/uploads/products/asus-rog-maximus-z790.jpg",
      images: ["/uploads/products/asus-rog-maximus-z790.jpg"],
      stock: 20,
      rating: 4.8,
      reviewCount: 95,
      featured: true,
      brand: "ASUS",
      categoryId: motherboardCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "MSI MEG X670E ACE",
      description: "AMD X670E. DDR5. PCIe 5.0.",
      price: 699,
      oldPrice: 749,
      image: "/uploads/products/msi-meg-x670e-ace.jpg",
      images: ["/uploads/products/msi-meg-x670e-ace.jpg"],
      stock: 18,
      rating: 4.7,
      reviewCount: 78,
      onSale: true,
      brand: "MSI",
      categoryId: motherboardCategory.id,
    },
  });

  // RAM (2)
  await prisma.product.create({
    data: {
      name: "G.Skill Trident Z5 RGB DDR5-6400 32GB",
      description: "32GB (2x16GB). DDR5-6400. CL32.",
      price: 179,
      oldPrice: 199,
      image: "/uploads/products/gskill-trident-z5.jpg",
      images: ["/uploads/products/gskill-trident-z5.jpg"],
      stock: 60,
      rating: 4.8,
      reviewCount: 245,
      onSale: true,
      brand: "G.Skill",
      categoryId: ramCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Corsair Dominator Platinum RGB DDR5 64GB",
      description: "64GB (2x32GB). DDR5-6000. CL30.",
      price: 349,
      image: "/uploads/products/corsair-dominator-ddr5.jpg",
      images: ["/uploads/products/corsair-dominator-ddr5.jpg"],
      stock: 30,
      rating: 4.7,
      reviewCount: 120,
      isNew: true,
      brand: "Corsair",
      categoryId: ramCategory.id,
    },
  });

  // Monitors (2)
  await prisma.product.create({
    data: {
      name: 'LG UltraGear 27" QHD OLED Gaming Monitor',
      description: "27-inch QHD OLED. 240Hz. 0.03ms.",
      price: 899,
      oldPrice: 999,
      image: "/uploads/products/lg-ultragear-oled.jpg",
      images: ["/uploads/products/lg-ultragear-oled.jpg"],
      stock: 25,
      rating: 4.8,
      reviewCount: 145,
      featured: true,
      onSale: true,
      brand: "LG",
      categoryId: monitorCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'Samsung Odyssey G9 49" Curved',
      description: "49-inch curved. 240Hz. Dual QHD.",
      price: 1299,
      oldPrice: 1499,
      image: "/uploads/products/samsung-odyssey-g9.jpg",
      images: ["/uploads/products/samsung-odyssey-g9.jpg"],
      stock: 20,
      rating: 4.7,
      reviewCount: 195,
      onSale: true,
      brand: "Samsung",
      categoryId: monitorCategory.id,
    },
  });

  // Gaming Mice (2)
  await prisma.product.create({
    data: {
      name: "Logitech G Pro X Superlight 2",
      description: "60g weight. HERO 2 sensor. LIGHTSPEED.",
      price: 159,
      image: "/uploads/products/logitech-g-pro-superlight-2.jpg",
      images: ["/uploads/products/logitech-g-pro-superlight-2.jpg"],
      stock: 45,
      rating: 4.9,
      reviewCount: 410,
      featured: true,
      isNew: true,
      brand: "Logitech",
      categoryId: mouseCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Razer DeathAdder V3 Pro",
      description: "63g ultralight. Focus Pro 30K sensor.",
      price: 149,
      oldPrice: 179,
      image: "/uploads/products/razer-deathadder-v3-pro.jpg",
      images: ["/uploads/products/razer-deathadder-v3-pro.jpg"],
      stock: 50,
      rating: 4.8,
      reviewCount: 320,
      onSale: true,
      brand: "Razer",
      categoryId: mouseCategory.id,
    },
  });

  // Keyboards (2)
  await prisma.product.create({
    data: {
      name: "Razer Huntsman V3 Pro",
      description: "Analog optical switches. Per-key RGB.",
      price: 249,
      image: "/uploads/products/razer-huntsman-v3-pro.jpg",
      images: ["/uploads/products/razer-huntsman-v3-pro.jpg"],
      stock: 30,
      rating: 4.8,
      reviewCount: 145,
      featured: true,
      isNew: true,
      brand: "Razer",
      categoryId: keyboardCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Logitech G915 X Wireless",
      description: "Low-profile GL switches. LIGHTSPEED.",
      price: 229,
      oldPrice: 259,
      image: "/uploads/products/logitech-g915-x.jpg",
      images: ["/uploads/products/logitech-g915-x.jpg"],
      stock: 35,
      rating: 4.7,
      reviewCount: 280,
      onSale: true,
      brand: "Logitech",
      categoryId: keyboardCategory.id,
    },
  });

  // Headsets (2) ///////////////////////////////
  await prisma.product.create({
    data: {
      name: "SteelSeries Arctis Nova Pro Wireless",
      description: "Hi-Fi drivers. Active noise cancellation.",
      price: 349,
      image: "/uploads/products/steelseries-arctis-nova-pro.jpg",
      images: ["/uploads/products/steelseries-arctis-nova-pro.jpg"],
      stock: 30,
      rating: 4.8,
      reviewCount: 280,
      featured: true,
      brand: "SteelSeries",
      categoryId: headsetCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Razer BlackShark V2 Pro",
      description: "TriForce Titanium 50mm drivers. THX Spatial.",
      price: 179,
      oldPrice: 199,
      image: "/uploads/products/razer-blackshark-v2-pro.jpg",
      images: ["/uploads/products/razer-blackshark-v2-pro.jpg"],
      stock: 45,
      rating: 4.7,
      reviewCount: 350,
      onSale: true,
      brand: "Razer",
      categoryId: headsetCategory.id,
    },
  });

  // Microphones (2)
  await prisma.product.create({
    data: {
      name: "Shure SM7B",
      description: "Industry standard. Dynamic cardioid.",
      price: 399,
      image: "/uploads/products/shure-sm7b.jpg",
      images: ["/uploads/products/shure-sm7b.jpg"],
      stock: 30,
      rating: 4.9,
      reviewCount: 520,
      featured: true,
      brand: "Shure",
      categoryId: microphoneCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Blue Yeti X",
      description: "4-capsule array. Blue VO!CE effects.",
      price: 169,
      oldPrice: 199,
      image: "/uploads/products/blue-yeti-x.jpg",
      images: ["/uploads/products/blue-yeti-x.jpg"],
      stock: 50,
      rating: 4.7,
      reviewCount: 680,
      onSale: true,
      brand: "Logitech",
      categoryId: microphoneCategory.id,
    },
  });

  // Gaming Chairs (2)
  await prisma.product.create({
    data: {
      name: "Secretlab Titan Evo 2022",
      description: "Neo Hybrid Leatherette. 4-way lumbar.",
      price: 519,
      image: "/uploads/products/secretlab-titan-evo.jpg",
      images: ["/uploads/products/secretlab-titan-evo.jpg"],
      stock: 25,
      rating: 4.8,
      reviewCount: 890,
      featured: true,
      brand: "Secretlab",
      categoryId: chairCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Razer Iskur V2",
      description: "Adaptive lumbar support. EPU leather.",
      price: 499,
      oldPrice: 549,
      image: "/uploads/products/razer-iskur-v2.jpg",
      images: ["/uploads/products/razer-iskur-v2.jpg"],
      stock: 30,
      rating: 4.6,
      reviewCount: 320,
      onSale: true,
      brand: "Razer",
      categoryId: chairCategory.id,
    },
  });

  // Mousepads (2)
  await prisma.product.create({
    data: {
      name: "Artisan FX Zero XL",
      description: "Japanese quality. Control surface.",
      price: 69,
      image: "/uploads/products/artisan-fx-zero.jpg",
      images: ["/uploads/products/artisan-fx-zero.jpg"],
      stock: 40,
      rating: 4.9,
      reviewCount: 380,
      featured: true,
      brand: "Artisan",
      categoryId: mousepadCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Logitech G840 XL Gaming Mouse Pad",
      description: "Extra large. Consistent surface texture.",
      price: 49,
      oldPrice: 59,
      image: "/uploads/products/logitech-g840.jpg",
      images: ["/uploads/products/logitech-g840.jpg"],
      stock: 80,
      rating: 4.6,
      reviewCount: 520,
      onSale: true,
      brand: "Logitech",
      categoryId: mousepadCategory.id,
    },
  });

  // SSDs (2)
  await prisma.product.create({
    data: {
      name: "Samsung 990 Pro 2TB",
      description: "PCIe 4.0 NVMe. 7,450 MB/s read.",
      price: 179,
      oldPrice: 219,
      image: "/uploads/products/samsung-990-pro.jpg",
      images: ["/uploads/products/samsung-990-pro.jpg"],
      stock: 60,
      rating: 4.9,
      reviewCount: 520,
      featured: true,
      onSale: true,
      brand: "Samsung",
      categoryId: ssdCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "WD Black SN850X 2TB",
      description: "PCIe 4.0. 7,300 MB/s read.",
      price: 159,
      image: "/uploads/products/wd-black-sn850x.jpg",
      images: ["/uploads/products/wd-black-sn850x.jpg"],
      stock: 55,
      rating: 4.8,
      reviewCount: 380,
      brand: "Western Digital",
      categoryId: ssdCategory.id,
    },
  });

  console.log("✅ Created PC component products");

  // ==================== TVs ====================

  // Samsung TVs (2)
  await prisma.product.create({
    data: {
      name: 'Samsung 65" S95D OLED 4K Smart TV',
      description: "QD-OLED. Glare-free screen.",
      price: 2599,
      oldPrice: 2999,
      image: "/uploads/products/samsung-s95d-65.jpg",
      images: ["/uploads/products/samsung-s95d-65.jpg"],
      stock: 20,
      rating: 4.9,
      reviewCount: 145,
      featured: true,
      onSale: true,
      brand: "Samsung",
      categoryId: samsungTV.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'Samsung 55" The Frame QLED',
      description: "Art Mode. Customizable bezel.",
      price: 1299,
      oldPrice: 1499,
      image: "/uploads/products/samsung-frame-55.jpg",
      images: ["/uploads/products/samsung-frame-55.jpg"],
      stock: 35,
      rating: 4.7,
      reviewCount: 320,
      onSale: true,
      brand: "Samsung",
      categoryId: samsungTV.id,
    },
  });

  // LG TVs (2)
  await prisma.product.create({
    data: {
      name: 'LG 65" G4 OLED evo 4K Smart TV',
      description: "MLA technology. a11 AI processor.",
      price: 2999,
      image: "/uploads/products/lg-g4-65.jpg",
      images: ["/uploads/products/lg-g4-65.jpg"],
      stock: 18,
      rating: 4.9,
      reviewCount: 165,
      featured: true,
      isNew: true,
      brand: "LG",
      categoryId: lgTV.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'LG 55" C4 OLED evo 4K',
      description: "Perfect blacks. 144Hz gaming.",
      price: 1499,
      oldPrice: 1799,
      image: "/uploads/products/lg-c4-55.jpg",
      images: ["/uploads/products/lg-c4-55.jpg"],
      stock: 30,
      rating: 4.8,
      reviewCount: 280,
      onSale: true,
      brand: "LG",
      categoryId: lgTV.id,
    },
  });

  // Sony TVs (2)
  await prisma.product.create({
    data: {
      name: 'Sony 65" BRAVIA XR A95L QD-OLED',
      description: "XR Cognitive Processor. Perfect for PS5.",
      price: 2799,
      image: "/uploads/products/sony-a95l-65.jpg",
      images: ["/uploads/products/sony-a95l-65.jpg"],
      stock: 15,
      rating: 4.9,
      reviewCount: 125,
      featured: true,
      isNew: true,
      brand: "Sony",
      categoryId: sonyTV.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'Sony 55" BRAVIA 8 OLED',
      description: "XR OLED Contrast Pro. Google TV.",
      price: 1699,
      image: "/uploads/products/sony-bravia-8-55.jpg",
      images: ["/uploads/products/sony-bravia-8-55.jpg"],
      stock: 30,
      rating: 4.8,
      reviewCount: 95,
      isNew: true,
      brand: "Sony",
      categoryId: sonyTV.id,
    },
  });

  // Hisense TVs (2)
  await prisma.product.create({
    data: {
      name: 'Hisense 65" U8N Mini-LED 4K',
      description: "5000+ dimming zones. 144Hz VRR.",
      price: 1099,
      oldPrice: 1299,
      image: "/uploads/products/hisense-u8n-65.jpg",
      images: ["/uploads/products/hisense-u8n-65.jpg"],
      stock: 35,
      rating: 4.7,
      reviewCount: 210,
      featured: true,
      onSale: true,
      brand: "Hisense",
      categoryId: hisenseTV.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'Hisense 55" A7N Series 4K',
      description: "Quantum Dot color. Game Mode Plus.",
      price: 349,
      oldPrice: 449,
      image: "/uploads/products/hisense-a7n-55.jpg",
      images: ["/uploads/products/hisense-a7n-55.jpg"],
      stock: 60,
      rating: 4.4,
      reviewCount: 380,
      onSale: true,
      brand: "Hisense",
      categoryId: hisenseTV.id,
    },
  });

  console.log("✅ Created TV products");

  // ==================== CAMERAS ====================

  // Canon (2)
  await prisma.product.create({
    data: {
      name: "Canon EOS R5 Mark II",
      description: "45MP Full-Frame. 8K RAW video.",
      price: 4299,
      image: "/uploads/products/canon-eos-r5-ii.jpg",
      images: ["/uploads/products/canon-eos-r5-ii.jpg"],
      stock: 12,
      rating: 4.9,
      reviewCount: 95,
      featured: true,
      isNew: true,
      brand: "Canon",
      categoryId: canonCamera.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Canon EOS R6 Mark II",
      description: "24.2MP Full-Frame. 40fps continuous.",
      price: 2499,
      oldPrice: 2699,
      image: "/uploads/products/canon-eos-r6-ii.jpg",
      images: ["/uploads/products/canon-eos-r6-ii.jpg"],
      stock: 25,
      rating: 4.8,
      reviewCount: 180,
      onSale: true,
      brand: "Canon",
      categoryId: canonCamera.id,
    },
  });

  // Nikon (2)
  await prisma.product.create({
    data: {
      name: "Nikon Z8",
      description: "45.7MP Stacked CMOS. 8K30 video.",
      price: 3999,
      image: "/uploads/products/nikon-z8.jpg",
      images: ["/uploads/products/nikon-z8.jpg"],
      stock: 15,
      rating: 4.9,
      reviewCount: 125,
      featured: true,
      isNew: true,
      brand: "Nikon",
      categoryId: nikonCamera.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Nikon Zf",
      description: "24.5MP retro design. Full-frame.",
      price: 1999,
      image: "/uploads/products/nikon-zf.jpg",
      images: ["/uploads/products/nikon-zf.jpg"],
      stock: 30,
      rating: 4.8,
      reviewCount: 210,
      featured: true,
      brand: "Nikon",
      categoryId: nikonCamera.id,
    },
  });

  // Fujifilm (2)
  await prisma.product.create({
    data: {
      name: "Fujifilm X-T5",
      description: "40.2MP X-Trans. 7-stop IBIS.",
      price: 1699,
      oldPrice: 1799,
      image: "/uploads/products/fujifilm-x-t5.jpg",
      images: ["/uploads/products/fujifilm-x-t5.jpg"],
      stock: 28,
      rating: 4.8,
      reviewCount: 280,
      onSale: true,
      brand: "Fujifilm",
      categoryId: fujifilmCamera.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Fujifilm X100VI",
      description: "40.2MP APS-C. Fixed 23mm f/2 lens.",
      price: 1599,
      image: "/uploads/products/fujifilm-x100vi.jpg",
      images: ["/uploads/products/fujifilm-x100vi.jpg"],
      stock: 10,
      rating: 4.9,
      reviewCount: 320,
      featured: true,
      isNew: true,
      brand: "Fujifilm",
      categoryId: fujifilmCamera.id,
    },
  });

  // Sony Cameras (2)
  await prisma.product.create({
    data: {
      name: "Sony a7R V",
      description: "61MP Full-Frame. AI-based AF.",
      price: 3899,
      image: "/uploads/products/sony-a7r-v.jpg",
      images: ["/uploads/products/sony-a7r-v.jpg"],
      stock: 15,
      rating: 4.9,
      reviewCount: 165,
      featured: true,
      brand: "Sony",
      categoryId: sonyCamera.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Sony α7 IV",
      description: "33MP Full-Frame. Hybrid AF. 4K60.",
      price: 2499,
      oldPrice: 2699,
      image: "/uploads/products/sony-a7-iv.jpg",
      images: ["/uploads/products/sony-a7-iv.jpg"],
      stock: 30,
      rating: 4.8,
      reviewCount: 380,
      onSale: true,
      brand: "Sony",
      categoryId: sonyCamera.id,
    },
  });

  console.log("✅ Created camera products");

  // ==================== SMART WATCHES ====================

  // Apple Watch (2)
  await prisma.product.create({
    data: {
      name: "Apple Watch Ultra 2",
      description: "49mm titanium. Precision GPS. 36hr battery.",
      price: 799,
      image: "/uploads/products/apple-watch-ultra-2.jpg",
      images: ["/uploads/products/apple-watch-ultra-2.jpg"],
      stock: 35,
      rating: 4.9,
      reviewCount: 420,
      featured: true,
      isNew: true,
      brand: "Apple",
      categoryId: appleWatch.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Apple Watch Series 9 45mm",
      description: "S9 SiP. Double tap gesture.",
      price: 429,
      oldPrice: 459,
      image: "/uploads/products/apple-watch-series-9.jpg",
      images: ["/uploads/products/apple-watch-series-9.jpg"],
      stock: 55,
      rating: 4.8,
      reviewCount: 580,
      onSale: true,
      brand: "Apple",
      categoryId: appleWatch.id,
    },
  });

  // Google Watch (2)
  await prisma.product.create({
    data: {
      name: "Google Pixel Watch 2",
      description: "Fitbit health. Safety features. Google AI.",
      price: 349,
      oldPrice: 399,
      image: "/uploads/products/google-pixel-watch-2.jpg",
      images: ["/uploads/products/google-pixel-watch-2.jpg"],
      stock: 40,
      rating: 4.5,
      reviewCount: 290,
      featured: true,
      onSale: true,
      brand: "Google",
      categoryId: googleWatch.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Google Pixel Watch",
      description: "Circular design. Wear OS. Fitbit integration.",
      price: 249,
      image: "/uploads/products/google-pixel-watch.jpg",
      images: ["/uploads/products/google-pixel-watch.jpg"],
      stock: 35,
      rating: 4.3,
      reviewCount: 420,
      brand: "Google",
      categoryId: googleWatch.id,
    },
  });

  // Samsung Watch (2)
  await prisma.product.create({
    data: {
      name: "Samsung Galaxy Watch 6 Classic 47mm",
      description: "Rotating bezel. BioActive Sensor.",
      price: 429,
      oldPrice: 459,
      image: "/uploads/products/samsung-watch-6-classic.jpg",
      images: ["/uploads/products/samsung-watch-6-classic.jpg"],
      stock: 40,
      rating: 4.7,
      reviewCount: 320,
      featured: true,
      onSale: true,
      brand: "Samsung",
      categoryId: samsungWatch.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Samsung Galaxy Watch Ultra",
      description: "Titanium case. 100m water resistance.",
      price: 649,
      image: "/uploads/products/samsung-watch-ultra.jpg",
      images: ["/uploads/products/samsung-watch-ultra.jpg"],
      stock: 25,
      rating: 4.7,
      reviewCount: 145,
      isNew: true,
      brand: "Samsung",
      categoryId: samsungWatch.id,
    },
  });

  // Huawei Watch (2)
  await prisma.product.create({
    data: {
      name: "Huawei Watch GT 4 46mm",
      description: "14-day battery. Dual-band GPS.",
      price: 249,
      oldPrice: 279,
      image: "/uploads/products/huawei-watch-gt4.jpg",
      images: ["/uploads/products/huawei-watch-gt4.jpg"],
      stock: 45,
      rating: 4.5,
      reviewCount: 280,
      featured: true,
      onSale: true,
      brand: "Huawei",
      categoryId: huaweiWatch.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Huawei Watch 4 Pro",
      description: "eSIM calling. ECG analysis.",
      price: 499,
      oldPrice: 549,
      image: "/uploads/products/huawei-watch-4-pro.jpg",
      images: ["/uploads/products/huawei-watch-4-pro.jpg"],
      stock: 30,
      rating: 4.5,
      reviewCount: 165,
      onSale: true,
      brand: "Huawei",
      categoryId: huaweiWatch.id,
    },
  });

  console.log("✅ Created smart watch products");

  // ==================== VIDEO GAMES ====================

  // Steam Games (3)
  await prisma.product.create({
    data: {
      name: "EA SPORTS FC 25 - PC (Steam)",
      description: "Next-gen football. HyperMotion V. CrossPlay.",
      price: 69.99,
      image: "/uploads/products/fc-25-steam.jpg",
      images: ["/uploads/products/fc-25-steam.jpg"],
      stock: 999,
      rating: 4.3,
      reviewCount: 1250,
      featured: true,
      isNew: true,
      brand: "Steam",
      categoryId: steamGames.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Call of Duty: Modern Warfare III - PC",
      description: "Open-world Zombies. Multiplayer mayhem.",
      price: 69.99,
      oldPrice: 79.99,
      image: "/uploads/products/cod-mw3-steam.jpg",
      images: ["/uploads/products/cod-mw3-steam.jpg"],
      stock: 999,
      rating: 4.1,
      reviewCount: 2100,
      onSale: true,
      brand: "Steam",
      categoryId: steamGames.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Escape from Tarkov",
      description: "Hardcore FPS. Realistic combat. Loot-based.",
      price: 44.99,
      image: "/uploads/products/escape-tarkov.jpg",
      images: ["/uploads/products/escape-tarkov.jpg"],
      stock: 999,
      rating: 4.5,
      reviewCount: 3200,
      featured: true,
      brand: "Steam",
      categoryId: steamGames.id,
    },
  });

  // EA Games (2)
  await prisma.product.create({
    data: {
      name: "Battlefield 2042 - PC (EA App)",
      description: "All-out warfare. 128 players.",
      price: 29.99,
      oldPrice: 59.99,
      image: "/uploads/products/battlefield-2042.jpg",
      images: ["/uploads/products/battlefield-2042.jpg"],
      stock: 999,
      rating: 3.8,
      reviewCount: 2400,
      onSale: true,
      brand: "EA",
      categoryId: eaGames.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "EA Play 12 Month Subscription",
      description: "Access to EA game library. 10% discount.",
      price: 29.99,
      image: "/uploads/products/ea-play-12.jpg",
      images: ["/uploads/products/ea-play-12.jpg"],
      stock: 999,
      rating: 4.4,
      reviewCount: 1800,
      brand: "EA",
      categoryId: eaGames.id,
    },
  });

  // Battle.net Games (2)
  await prisma.product.create({
    data: {
      name: "Diablo IV - Standard Edition",
      description: "Return to darkness. Open world action RPG.",
      price: 49.99,
      oldPrice: 69.99,
      image: "/uploads/products/diablo-4.jpg",
      images: ["/uploads/products/diablo-4.jpg"],
      stock: 999,
      rating: 4.4,
      reviewCount: 4200,
      featured: true,
      onSale: true,
      brand: "Blizzard",
      categoryId: battlenetGames.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "World of Warcraft: The War Within",
      description: "New expansion. Level boost included.",
      price: 89.99,
      image: "/uploads/products/wow-war-within.jpg",
      images: ["/uploads/products/wow-war-within.jpg"],
      stock: 999,
      rating: 4.6,
      reviewCount: 1200,
      featured: true,
      isNew: true,
      brand: "Blizzard",
      categoryId: battlenetGames.id,
    },
  });

  console.log("✅ Created video game products");

  // ==================== GIFT CARDS ====================

  // Steam Gift Cards (2)
  await prisma.product.create({
    data: {
      name: "Steam Wallet Gift Card - \$50",
      description: "Add \$50 to your Steam wallet. Instant delivery.",
      price: 50,
      image: "/uploads/products/steam-gift-50.jpg",
      images: ["/uploads/products/steam-gift-50.jpg"],
      stock: 999,
      rating: 4.9,
      reviewCount: 4500,
      featured: true,
      brand: "Steam",
      categoryId: steamCards.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Steam Wallet Gift Card - \$100",
      description: "Add \$100 to your Steam wallet. Instant delivery.",
      price: 100,
      image: "/uploads/products/steam-gift-100.jpg",
      images: ["/uploads/products/steam-gift-100.jpg"],
      stock: 999,
      rating: 4.9,
      reviewCount: 3200,
      brand: "Steam",
      categoryId: steamCards.id,
    },
  });

  // Riot Games Cards (2)
  await prisma.product.create({
    data: {
      name: "League of Legends - 3500 Riot Points",
      description: "Get champions, skins, and more.",
      price: 25,
      image: "/uploads/products/lol-rp-3500.jpg",
      images: ["/uploads/products/lol-rp-3500.jpg"],
      stock: 999,
      rating: 4.8,
      reviewCount: 2800,
      featured: true,
      brand: "Riot Games",
      categoryId: riotCards.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Valorant Points - 5350 VP",
      description: "Purchase skins and battle passes.",
      price: 50,
      image: "/uploads/products/valorant-vp-5350.jpg",
      images: ["/uploads/products/valorant-vp-5350.jpg"],
      stock: 999,
      rating: 4.8,
      reviewCount: 1950,
      brand: "Riot Games",
      categoryId: riotCards.id,
    },
  });

  // Amazon Gift Cards (2)
  await prisma.product.create({
    data: {
      name: "Amazon Gift Card - \$50",
      description: "Redeemable for millions of items.",
      price: 50,
      image: "/uploads/products/amazon-gift-50.jpg",
      images: ["/uploads/products/amazon-gift-50.jpg"],
      stock: 999,
      rating: 4.9,
      reviewCount: 8500,
      featured: true,
      brand: "Amazon",
      categoryId: amazonCards.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Amazon Gift Card - \$100",
      description: "Redeemable for millions of items.",
      price: 100,
      image: "/uploads/products/amazon-gift-100.jpg",
      images: ["/uploads/products/amazon-gift-100.jpg"],
      stock: 999,
      rating: 4.9,
      reviewCount: 6200,
      brand: "Amazon",
      categoryId: amazonCards.id,
    },
  });

  // Apple Gift Cards (2)
  await prisma.product.create({
    data: {
      name: "Apple Gift Card - \$50",
      description: "For App Store, Apple Music, iCloud+, and more.",
      price: 50,
      image: "/uploads/products/apple-gift-50.jpg",
      images: ["/uploads/products/apple-gift-50.jpg"],
      stock: 999,
      rating: 4.9,
      reviewCount: 5600,
      featured: true,
      brand: "Apple",
      categoryId: appleCards.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Apple Gift Card - \$100",
      description: "For App Store, Apple Music, iCloud+, and more.",
      price: 100,
      image: "/uploads/products/apple-gift-100.jpg",
      images: ["/uploads/products/apple-gift-100.jpg"],
      stock: 999,
      rating: 4.9,
      reviewCount: 4100,
      brand: "Apple",
      categoryId: appleCards.id,
    },
  });

  // Google Play Gift Cards (2)
  await prisma.product.create({
    data: {
      name: "Google Play Gift Card - \$50",
      description: "For apps, games, music, movies, and more.",
      price: 50,
      image: "/uploads/products/google-play-gift-50.jpg",
      images: ["/uploads/products/google-play-gift-50.jpg"],
      stock: 999,
      rating: 4.8,
      reviewCount: 4800,
      featured: true,
      brand: "Google",
      categoryId: googleCards.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Google Play Gift Card - \$100",
      description: "For apps, games, music, movies, and more.",
      price: 100,
      image: "/uploads/products/google-play-gift-100.jpg",
      images: ["/uploads/products/google-play-gift-100.jpg"],
      stock: 999,
      rating: 4.8,
      reviewCount: 3500,
      brand: "Google",
      categoryId: googleCards.id,
    },
  });

  console.log("✅ Created gift card products");

  // ==================== SOFTWARE ====================

  // Operating Systems (2)
  await prisma.product.create({
    data: {
      name: "Windows 11 Pro License Key",
      description: "Genuine license. Instant delivery. Lifetime activation.",
      price: 139,
      oldPrice: 199,
      image: "/uploads/products/windows-11-pro.jpg",
      images: ["/uploads/products/windows-11-pro.jpg"],
      stock: 999,
      rating: 4.7,
      reviewCount: 2800,
      featured: true,
      onSale: true,
      brand: "Microsoft",
      categoryId: osCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Windows 11 Home License Key",
      description: "Genuine license. Instant delivery. Lifetime activation.",
      price: 119,
      oldPrice: 139,
      image: "/uploads/products/windows-11-home.jpg",
      images: ["/uploads/products/windows-11-home.jpg"],
      stock: 999,
      rating: 4.7,
      reviewCount: 3500,
      onSale: true,
      brand: "Microsoft",
      categoryId: osCategory.id,
    },
  });

  // Antivirus (2)
  await prisma.product.create({
    data: {
      name: "Norton 360 Deluxe - 1 Year",
      description: "5 devices. VPN included. Dark web monitoring.",
      price: 49.99,
      oldPrice: 89.99,
      image: "/uploads/products/norton-360-deluxe.jpg",
      images: ["/uploads/products/norton-360-deluxe.jpg"],
      stock: 999,
      rating: 4.5,
      reviewCount: 1800,
      featured: true,
      onSale: true,
      brand: "Norton",
      categoryId: antivirusCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Bitdefender Total Security - 1 Year",
      description: "5 devices. Complete protection suite.",
      price: 39.99,
      oldPrice: 79.99,
      image: "/uploads/products/bitdefender-total.jpg",
      images: ["/uploads/products/bitdefender-total.jpg"],
      stock: 999,
      rating: 4.6,
      reviewCount: 2100,
      onSale: true,
      brand: "Bitdefender",
      categoryId: antivirusCategory.id,
    },
  });

  // Office (2)
  await prisma.product.create({
    data: {
      name: "Microsoft Office 2021 Professional Plus",
      description: "Word, Excel, PowerPoint, Outlook. Lifetime license.",
      price: 249,
      oldPrice: 439,
      image: "/uploads/products/office-2021-pro.jpg",
      images: ["/uploads/products/office-2021-pro.jpg"],
      stock: 999,
      rating: 4.8,
      reviewCount: 3200,
      featured: true,
      onSale: true,
      brand: "Microsoft",
      categoryId: officeCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Microsoft 365 Personal - 1 Year",
      description: "1TB OneDrive. Premium Office apps. 1 user.",
      price: 69.99,
      image: "/uploads/products/microsoft-365-personal.jpg",
      images: ["/uploads/products/microsoft-365-personal.jpg"],
      stock: 999,
      rating: 4.7,
      reviewCount: 4500,
      brand: "Microsoft",
      categoryId: officeCategory.id,
    },
  });

  // VPN (2)
  await prisma.product.create({
    data: {
      name: "NordVPN - 2 Year Plan",
      description: "6 devices. 5500+ servers. Threat protection.",
      price: 83.76,
      oldPrice: 286.8,
      image: "/uploads/products/nordvpn-2year.jpg",
      images: ["/uploads/products/nordvpn-2year.jpg"],
      stock: 999,
      rating: 4.7,
      reviewCount: 5600,
      featured: true,
      onSale: true,
      brand: "NordVPN",
      categoryId: vpnCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "ExpressVPN - 1 Year Plan",
      description: "8 devices. 94 countries. Fastest VPN.",
      price: 99.95,
      oldPrice: 155.4,
      image: "/uploads/products/expressvpn-1year.jpg",
      images: ["/uploads/products/expressvpn-1year.jpg"],
      stock: 999,
      rating: 4.6,
      reviewCount: 3800,
      onSale: true,
      brand: "ExpressVPN",
      categoryId: vpnCategory.id,
    },
  });

  console.log("✅ Created software products");

  // ==================== SUBSCRIPTIONS ====================

  await prisma.product.create({
    data: {
      name: "Spotify Premium - 12 Months",
      description: "Ad-free music. Offline listening. High quality audio.",
      price: 119.88,
      oldPrice: 131.88,
      image: "/uploads/products/spotify-premium-12.jpg",
      images: ["/uploads/products/spotify-premium-12.jpg"],
      stock: 999,
      rating: 4.9,
      reviewCount: 8500,
      featured: true,
      onSale: true,
      brand: "Spotify",
      categoryId: subscriptions.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Netflix Premium - 1 Month Gift",
      description: "4K Ultra HD. 4 screens. Ad-free.",
      price: 22.99,
      image: "/uploads/products/netflix-premium.jpg",
      images: ["/uploads/products/netflix-premium.jpg"],
      stock: 999,
      rating: 4.8,
      reviewCount: 6200,
      brand: "Netflix",
      categoryId: subscriptions.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Discord Nitro - 12 Months",
      description: "HD streaming. Custom emojis. Server boosts.",
      price: 99.99,
      image: "/uploads/products/discord-nitro-12.jpg",
      images: ["/uploads/products/discord-nitro-12.jpg"],
      stock: 999,
      rating: 4.7,
      reviewCount: 3400,
      featured: true,
      brand: "Discord",
      categoryId: subscriptions.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Amazon Prime - 1 Year",
      description: "Free shipping. Prime Video. Prime Gaming.",
      price: 139,
      image: "/uploads/products/amazon-prime-1year.jpg",
      images: ["/uploads/products/amazon-prime-1year.jpg"],
      stock: 999,
      rating: 4.8,
      reviewCount: 9200,
      featured: true,
      brand: "Amazon",
      categoryId: subscriptions.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Twitch Turbo - 6 Months",
      description: "Ad-free viewing. Extended broadcast storage.",
      price: 53.94,
      oldPrice: 59.94,
      image: "/uploads/products/twitch-turbo-6.jpg",
      images: ["/uploads/products/twitch-turbo-6.jpg"],
      stock: 999,
      rating: 4.5,
      reviewCount: 1800,
      onSale: true,
      brand: "Twitch",
      categoryId: subscriptions.id,
    },
  });

  console.log("✅ Created subscription products");

  // ==================== CLOTHING ====================

  // Men's Clothing (3)
  await prisma.product.create({
    data: {
      name: "Nike Dri-FIT Men's Training T-Shirt",
      description: "Sweat-wicking fabric. Breathable design.",
      price: 35,
      oldPrice: 45,
      image: "/uploads/products/nike-drifit-tshirt.jpg",
      images: ["/uploads/products/nike-drifit-tshirt.jpg"],
      stock: 150,
      rating: 4.6,
      reviewCount: 890,
      onSale: true,
      brand: "Nike",
      categoryId: mensClothing.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Adidas Essentials Men's Hoodie",
      description: "Soft fleece. Kangaroo pocket. Ribbed cuffs.",
      price: 65,
      image: "/uploads/products/adidas-essentials-hoodie.jpg",
      images: ["/uploads/products/adidas-essentials-hoodie.jpg"],
      stock: 120,
      rating: 4.7,
      reviewCount: 650,
      featured: true,
      brand: "Adidas",
      categoryId: mensClothing.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Levi's 501 Original Fit Jeans",
      description: "Classic straight leg. Button fly. Iconic style.",
      price: 89,
      oldPrice: 98,
      image: "/uploads/products/levis-501-jeans.jpg",
      images: ["/uploads/products/levis-501-jeans.jpg"],
      stock: 80,
      rating: 4.8,
      reviewCount: 1200,
      onSale: true,
      brand: "Levi's",
      categoryId: mensClothing.id,
    },
  });

  // Women's Clothing (3)
  await prisma.product.create({
    data: {
      name: "Nike Sportswear Women's Cropped T-Shirt",
      description: "Relaxed fit. Soft cotton. Modern crop length.",
      price: 30,
      image: "/uploads/products/nike-womens-crop-tshirt.jpg",
      images: ["/uploads/products/nike-womens-crop-tshirt.jpg"],
      stock: 140,
      rating: 4.5,
      reviewCount: 720,
      brand: "Nike",
      categoryId: womensClothing.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Adidas Women's Yoga Leggings",
      description: "High-rise waist. 4-way stretch. Moisture-wicking.",
      price: 55,
      oldPrice: 65,
      image: "/uploads/products/adidas-yoga-leggings.jpg",
      images: ["/uploads/products/adidas-yoga-leggings.jpg"],
      stock: 100,
      rating: 4.7,
      reviewCount: 560,
      featured: true,
      onSale: true,
      brand: "Adidas",
      categoryId: womensClothing.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Zara Women's Oversized Blazer",
      description: "Tailored fit. Shoulder pads. Front pockets.",
      price: 119,
      image: "/uploads/products/zara-oversized-blazer.jpg",
      images: ["/uploads/products/zara-oversized-blazer.jpg"],
      stock: 60,
      rating: 4.6,
      reviewCount: 380,
      featured: true,
      brand: "Zara",
      categoryId: womensClothing.id,
    },
  });

  // Kids Clothing (2)
  await prisma.product.create({
    data: {
      name: "Nike Kids' Graphic T-Shirt",
      description: "Soft cotton. Fun graphics. Easy to wash.",
      price: 25,
      oldPrice: 30,
      image: "/uploads/products/nike-kids-tshirt.jpg",
      images: ["/uploads/products/nike-kids-tshirt.jpg"],
      stock: 200,
      rating: 4.7,
      reviewCount: 450,
      onSale: true,
      brand: "Nike",
      categoryId: kidsClothing.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Adidas Kids' Track Suit",
      description: "Full zip jacket. Elastic waist pants. Comfortable fit.",
      price: 55,
      image: "/uploads/products/adidas-kids-tracksuit.jpg",
      images: ["/uploads/products/adidas-kids-tracksuit.jpg"],
      stock: 150,
      rating: 4.6,
      reviewCount: 320,
      featured: true,
      brand: "Adidas",
      categoryId: kidsClothing.id,
    },
  });

  // Shoes (3)
  await prisma.product.create({
    data: {
      name: "Nike Air Max 270",
      description: "Max Air unit. Breathable mesh. All-day comfort.",
      price: 150,
      oldPrice: 170,
      image: "/uploads/products/nike-air-max-270.jpg",
      images: ["/uploads/products/nike-air-max-270.jpg"],
      stock: 75,
      rating: 4.8,
      reviewCount: 1850,
      featured: true,
      onSale: true,
      brand: "Nike",
      categoryId: shoes.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Adidas Ultraboost 23",
      description: "BOOST midsole. Primeknit upper. Energy return.",
      price: 190,
      image: "/uploads/products/adidas-ultraboost-23.jpg",
      images: ["/uploads/products/adidas-ultraboost-23.jpg"],
      stock: 60,
      rating: 4.9,
      reviewCount: 1420,
      featured: true,
      brand: "Adidas",
      categoryId: shoes.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "New Balance 574 Classic",
      description: "ENCAP midsole. Suede and mesh upper. Heritage style.",
      price: 89,
      oldPrice: 99,
      image: "/uploads/products/newbalance-574.jpg",
      images: ["/uploads/products/newbalance-574.jpg"],
      stock: 90,
      rating: 4.7,
      reviewCount: 980,
      onSale: true,
      brand: "New Balance",
      categoryId: shoes.id,
    },
  });

  // Perfumes (3)
  await prisma.product.create({
    data: {
      name: "Dior Sauvage Eau de Parfum 100ml",
      description: "Fresh and bold fragrance for men. Long-lasting.",
      price: 150,
      image: "/uploads/products/dior-sauvage-edp.jpg",
      images: ["/uploads/products/dior-sauvage-edp.jpg"],
      stock: 40,
      rating: 4.9,
      reviewCount: 2800,
      featured: true,
      brand: "Dior",
      categoryId: perfumes.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Chanel Coco Mademoiselle EDP 100ml",
      description: "Fresh oriental fragrance for women. Elegant.",
      price: 165,
      image: "/uploads/products/chanel-coco-mademoiselle.jpg",
      images: ["/uploads/products/chanel-coco-mademoiselle.jpg"],
      stock: 35,
      rating: 4.9,
      reviewCount: 3200,
      featured: true,
      brand: "Chanel",
      categoryId: perfumes.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Versace Eros EDT 100ml",
      description: "Fresh and woody. Mint and vanilla notes.",
      price: 95,
      oldPrice: 120,
      image: "/uploads/products/versace-eros.jpg",
      images: ["/uploads/products/versace-eros.jpg"],
      stock: 55,
      rating: 4.8,
      reviewCount: 1650,
      onSale: true,
      brand: "Versace",
      categoryId: perfumes.id,
    },
  });

  console.log("✅ Created clothing products");

  // ============================================
  // CREATE COUPONS
  // ============================================

  await prisma.coupon.createMany({
    data: [
      {
        code: "SAVE10",
        description: "Save 10% on your order",
        type: "PERCENTAGE",
        value: 10,
        minOrderAmount: 50,
        isActive: true,
      },
      {
        code: "FIRST20",
        description: "Save 20% on your order",
        type: "PERCENTAGE",
        value: 10,
        minOrderAmount: 0,
        isActive: true,
      },
      {
        code: "SAVE20",
        description: "Save 20% on orders over \$100",
        type: "PERCENTAGE",
        value: 20,
        minOrderAmount: 100,
        maxDiscount: 50,
        isActive: true,
      },
      {
        code: "FLAT25",
        description: "\$25 off your order",
        type: "FIXED",
        value: 25,
        minOrderAmount: 100,
        isActive: true,
      },
      {
        code: "FLAT50",
        description: "\$50 off orders over \$200",
        type: "FIXED",
        value: 50,
        minOrderAmount: 200,
        isActive: true,
      },
      {
        code: "FREESHIP",
        description: "Free shipping on your order",
        type: "FREE_SHIPPING",
        value: 0,
        isActive: true,
      },
      {
        code: "WELCOME15",
        description: "15% off for new customers",
        type: "PERCENTAGE",
        value: 15,
        userLimit: 1,
        isActive: true,
      },
      {
        code: "GAMING25",
        description: "25% off gaming products",
        type: "PERCENTAGE",
        value: 25,
        minOrderAmount: 150,
        maxDiscount: 100,
        isActive: true,
      },
      {
        code: "SUMMER30",
        description: "Summer sale - 30% off",
        type: "PERCENTAGE",
        value: 30,
        minOrderAmount: 75,
        maxDiscount: 75,
        isActive: true,
      },
    ],
  });

  console.log("✅ Created coupons");

  // ============================================
  // CREATE DAILY DEAL (Valid for years - portfolio)
  // ============================================

  // Get the MacBook Pro product for the daily deal
  const dealProduct = await prisma.product.findFirst({
    where: { name: { contains: "Lenovo Legion Pro 7i" } },
  });

  if (dealProduct) {
    await prisma.dailyDeal.create({
      data: {
        productId: dealProduct.id,
        dealPrice: 2699,
        originalPrice: 3199,
        savings: 500,
        activeDate: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        freeShipping: true,
        freeGift: true,
        giftDescription: "Free Magic Mouse",
        isActive: true,
      },
    });

    console.log("✅ Created daily deal");
  }

  console.log("🎉 Seed completed successfully!");
  console.log("📊 Summary:");
  console.log("   - 3 Main Categories");
  console.log("   - 15 Subcategories");
  console.log("   - 50+ Brand/Type Categories");
  console.log("   - ~100 Products");
  console.log("   - 8 Coupons");
  console.log("   - 1 Daily Deal");
  console.log("   - 2 Test Users");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
