-- CreateEnum
CREATE TYPE "PackageType" AS ENUM ('GROUP', 'PRIVATE', 'SELF_GUIDED');

-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('EASY', 'MODERATE', 'CHALLENGING', 'HARD');

-- CreateEnum
CREATE TYPE "AccessibilityFeature" AS ENUM ('WHEELCHAIR_ACCESSIBLE', 'STROLLER_ACCESSIBLE', 'SERVICE_ANIMALS_ALLOWED', 'AUDIO_GUIDE_AVAILABLE', 'SIGN_LANGUAGE_AVAILABLE', 'LARGE_PRINT_MATERIAL', 'ASSISTIVE_LISTENING_SYSTEM', 'BRAILLE_MATERIAL', 'STEP_FREE_ACCESS', 'ELEVATOR_AVAILABLE', 'ACCESSIBLE_TOILET');

-- CreateEnum
CREATE TYPE "CancellationPolicyType" AS ENUM ('FLEXIBLE', 'MODERATE', 'STRICT', 'NON_REFUNDABLE');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT');

-- CreateTable
CREATE TABLE "TouristPackage" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "duration" TEXT,
    "type" "PackageType" NOT NULL DEFAULT 'GROUP',
    "difficulty" "DifficultyLevel",
    "languageId" INTEGER,
    "rating" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "minAge" INTEGER,
    "maxAge" INTEGER,
    "minParticipants" INTEGER,
    "maxParticipants" INTEGER,
    "meetingPoint" TEXT,
    "meetingLatitude" DOUBLE PRECISION,
    "meetingLongitude" DOUBLE PRECISION,
    "endPoint" TEXT,
    "endLatitude" DOUBLE PRECISION,
    "endLongitude" DOUBLE PRECISION,
    "timezone" TEXT,
    "bookingCutoff" TEXT,
    "requirements" TEXT[],
    "safetyInfo" TEXT,
    "additionalInfo" TEXT,
    "cancellationPolicy" TEXT,
    "cancellationType" "CancellationPolicyType",
    "includedItems" TEXT[],
    "excludedItems" TEXT[],
    "accessibilityOptions" "AccessibilityFeature"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TouristPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Benefit" (
    "id" SERIAL NOT NULL,
    "packageId" INTEGER NOT NULL,
    "iconUrl" TEXT,
    "title" TEXT NOT NULL,
    "text" TEXT,
    "order" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Benefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" SERIAL NOT NULL,
    "packageId" INTEGER NOT NULL,
    "category" TEXT,
    "iconUrl" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itinerary" (
    "id" SERIAL NOT NULL,
    "packageId" INTEGER NOT NULL,
    "title" TEXT,
    "days" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItineraryItem" (
    "id" SERIAL NOT NULL,
    "itineraryId" INTEGER NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startTime" TEXT,
    "endTime" TEXT,
    "location" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "order" INTEGER,

    CONSTRAINT "ItineraryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PickupDetail" (
    "id" SERIAL NOT NULL,
    "packageId" INTEGER NOT NULL,
    "isHotelPickupAvailable" BOOLEAN NOT NULL DEFAULT false,
    "pickupRadiusKm" DOUBLE PRECISION,
    "pickupAreaDescription" TEXT,
    "pickupStartTime" TEXT,
    "pickupEndTime" TEXT,
    "instructions" TEXT,

    CONSTRAINT "PickupDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "packageId" INTEGER NOT NULL,
    "type" "MediaType" NOT NULL DEFAULT 'IMAGE',
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "order" INTEGER,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingOption" (
    "id" SERIAL NOT NULL,
    "packageId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "currencyId" INTEGER NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "perPerson" BOOLEAN NOT NULL DEFAULT true,
    "minParticipants" INTEGER,
    "maxParticipants" INTEGER,
    "validFrom" TIMESTAMP(3),
    "validTo" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PricingOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "packageId" INTEGER NOT NULL,
    "timezone" TEXT NOT NULL,
    "daysOfWeek" "DayOfWeek"[],
    "startTime" TEXT NOT NULL,
    "endTime" TEXT,
    "notes" TEXT,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TouristPackageTranslation" (
    "id" SERIAL NOT NULL,
    "packageId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "meetingPoint" TEXT,
    "endPoint" TEXT,
    "additionalInfo" TEXT,
    "cancellationPolicy" TEXT,
    "requirements" TEXT[],
    "includedItems" TEXT[],
    "excludedItems" TEXT[],

    CONSTRAINT "TouristPackageTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageLanguage" (
    "packageId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "PackageLanguage_pkey" PRIMARY KEY ("packageId","languageId")
);

-- CreateIndex
CREATE INDEX "TouristPackage_companyId_idx" ON "TouristPackage"("companyId");

-- CreateIndex
CREATE INDEX "Benefit_packageId_idx" ON "Benefit"("packageId");

-- CreateIndex
CREATE INDEX "Feature_packageId_idx" ON "Feature"("packageId");

-- CreateIndex
CREATE INDEX "Itinerary_packageId_idx" ON "Itinerary"("packageId");

-- CreateIndex
CREATE INDEX "ItineraryItem_itineraryId_idx" ON "ItineraryItem"("itineraryId");

-- CreateIndex
CREATE INDEX "ItineraryItem_dayNumber_idx" ON "ItineraryItem"("dayNumber");

-- CreateIndex
CREATE INDEX "PickupDetail_packageId_idx" ON "PickupDetail"("packageId");

-- CreateIndex
CREATE INDEX "Media_packageId_idx" ON "Media"("packageId");

-- CreateIndex
CREATE INDEX "PricingOption_packageId_idx" ON "PricingOption"("packageId");

-- CreateIndex
CREATE INDEX "PricingOption_currencyId_idx" ON "PricingOption"("currencyId");

-- CreateIndex
CREATE INDEX "Schedule_packageId_idx" ON "Schedule"("packageId");

-- CreateIndex
CREATE UNIQUE INDEX "TouristPackageTranslation_packageId_languageId_key" ON "TouristPackageTranslation"("packageId", "languageId");

-- AddForeignKey
ALTER TABLE "TouristPackage" ADD CONSTRAINT "TouristPackage_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "TourismCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TouristPackage" ADD CONSTRAINT "TouristPackage_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Benefit" ADD CONSTRAINT "Benefit_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "TouristPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "TouristPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "TouristPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraryItem" ADD CONSTRAINT "ItineraryItem_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickupDetail" ADD CONSTRAINT "PickupDetail_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "TouristPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "TouristPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingOption" ADD CONSTRAINT "PricingOption_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "TouristPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingOption" ADD CONSTRAINT "PricingOption_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "TouristPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TouristPackageTranslation" ADD CONSTRAINT "TouristPackageTranslation_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "TouristPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TouristPackageTranslation" ADD CONSTRAINT "TouristPackageTranslation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageLanguage" ADD CONSTRAINT "PackageLanguage_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "TouristPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageLanguage" ADD CONSTRAINT "PackageLanguage_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
