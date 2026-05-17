/*
  Warnings:

  - You are about to drop the column `company` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "company",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "phone",
ADD COLUMN     "label" TEXT;
