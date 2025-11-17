/*
  Warnings:

  - Added the required column `adminId` to the `TourismCompany` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TourismCompany" ADD COLUMN     "adminId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SystemAdmin" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SystemAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyAdmin" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tourismCompanyId" INTEGER NOT NULL,

    CONSTRAINT "CompanyAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemAdmin_userId_key" ON "SystemAdmin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyAdmin_userId_key" ON "CompanyAdmin"("userId");

-- AddForeignKey
ALTER TABLE "SystemAdmin" ADD CONSTRAINT "SystemAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAdmin" ADD CONSTRAINT "CompanyAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourismCompany" ADD CONSTRAINT "TourismCompany_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "CompanyAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
