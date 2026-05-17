-- CreateTable
CREATE TABLE "DailyDeal" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "dealPrice" DOUBLE PRECISION NOT NULL,
    "originalPrice" DOUBLE PRECISION NOT NULL,
    "savings" DOUBLE PRECISION NOT NULL,
    "activeDate" DATE NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "freeShipping" BOOLEAN NOT NULL DEFAULT false,
    "freeGift" BOOLEAN NOT NULL DEFAULT false,
    "giftDescription" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyDeal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyDeal_activeDate_key" ON "DailyDeal"("activeDate");

-- AddForeignKey
ALTER TABLE "DailyDeal" ADD CONSTRAINT "DailyDeal_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
