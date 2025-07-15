-- CreateEnum
CREATE TYPE "ApplicantType" AS ENUM ('postgraduate', 'undergraduate', 'continuing');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarshipApplication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "phone" TEXT,
    "email" TEXT,
    "placeOfBirth" TEXT,
    "region" TEXT,
    "district" TEXT,
    "gender" TEXT,
    "isPhysicallyChallenged" BOOLEAN,
    "residentialAddressType" TEXT,
    "residentialAddress" TEXT,
    "nationality" TEXT NOT NULL,
    "idNumber" TEXT NOT NULL,
    "emergencyContactName" TEXT,
    "emergencyContactPhone" TEXT,
    "emergencyContactEmail" TEXT,
    "emergencyContactRelationship" TEXT,
    "emergencyContactRegion" TEXT,
    "emergencyContactAddress" TEXT,
    "occupation" TEXT,
    "employerName" TEXT,
    "companyName" TEXT,
    "institution" TEXT,
    "educationLevel" TEXT,
    "program" TEXT,
    "class" TEXT,
    "countryOfInstitution" TEXT,
    "yearOfEntry" INTEGER,
    "yearOfCompletion" INTEGER,
    "appliedProgram" TEXT,
    "appliedLevel" TEXT,
    "appliedInstitution" TEXT,
    "stemOption" TEXT,
    "duration" TEXT,
    "appliedCountry" TEXT,
    "tuitionFees" DOUBLE PRECISION,
    "conditionalOffer" TEXT,
    "hasOtherScholarship" BOOLEAN,
    "isPastGnpcBeneficiary" BOOLEAN,
    "justification" TEXT,
    "applicantType" "ApplicantType" NOT NULL,
    "gpa" DOUBLE PRECISION,
    "applicationDeadline" TIMESTAMP(3),
    "status" "ApplicationStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScholarshipApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "scholarshipApplicationId" TEXT NOT NULL,
    "type" TEXT,
    "fileUrl" TEXT,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "ScholarshipApplication" ADD CONSTRAINT "ScholarshipApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_scholarshipApplicationId_fkey" FOREIGN KEY ("scholarshipApplicationId") REFERENCES "ScholarshipApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
