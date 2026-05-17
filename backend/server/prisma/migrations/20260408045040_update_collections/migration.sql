-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "displayOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "label" TEXT,
ADD COLUMN     "labelColor" TEXT,
ADD COLUMN     "titleColor" TEXT;
