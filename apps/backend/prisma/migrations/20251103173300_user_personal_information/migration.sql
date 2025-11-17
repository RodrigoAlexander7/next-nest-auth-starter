/*
  Warnings:

  - A unique constraint covering the columns `[passportNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'UNKN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "documentNumber" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "nationalityId" INTEGER,
ADD COLUMN     "passportCountryId" INTEGER,
ADD COLUMN     "passportNumber" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_passportNumber_key" ON "User"("passportNumber");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_nationalityId_fkey" FOREIGN KEY ("nationalityId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_passportCountryId_fkey" FOREIGN KEY ("passportCountryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
