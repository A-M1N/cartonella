-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "brand" TEXT;

-- CreateIndex
CREATE INDEX "Product_brand_idx" ON "Product"("brand");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");
