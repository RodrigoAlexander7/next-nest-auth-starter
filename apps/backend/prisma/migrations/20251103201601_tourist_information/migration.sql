/*
  Warnings:

  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Tourist" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "languageId" INTEGER,
    "currencyId" INTEGER,
    "emergencyPhoneId" INTEGER,

    CONSTRAINT "Tourist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyWorker" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "role" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CompanyWorker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_WorkerPermissions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_WorkerPermissions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tourist_userId_key" ON "Tourist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyWorker_userId_companyId_key" ON "CompanyWorker"("userId", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- CreateIndex
CREATE INDEX "_WorkerPermissions_B_index" ON "_WorkerPermissions"("B");

-- AddForeignKey
ALTER TABLE "Tourist" ADD CONSTRAINT "Tourist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tourist" ADD CONSTRAINT "Tourist_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tourist" ADD CONSTRAINT "Tourist_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tourist" ADD CONSTRAINT "Tourist_emergencyPhoneId_fkey" FOREIGN KEY ("emergencyPhoneId") REFERENCES "Phone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyWorker" ADD CONSTRAINT "CompanyWorker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyWorker" ADD CONSTRAINT "CompanyWorker_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "TourismCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkerPermissions" ADD CONSTRAINT "_WorkerPermissions_A_fkey" FOREIGN KEY ("A") REFERENCES "CompanyWorker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkerPermissions" ADD CONSTRAINT "_WorkerPermissions_B_fkey" FOREIGN KEY ("B") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
