/*
  Warnings:

  - You are about to drop the column `scholarshipApplicationId` on the `Document` table. All the data in the column will be lost.
  - Added the required column `applicationId` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Made the column `type` on table `Document` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fileUrl` on table `Document` required. This step will fail if there are existing NULL values in that column.
  - Made the column `appliedInstitution` on table `ScholarshipApplication` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_scholarshipApplicationId_fkey";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "scholarshipApplicationId",
ADD COLUMN     "applicationId" TEXT NOT NULL,
ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "fileUrl" SET NOT NULL;

-- AlterTable
ALTER TABLE "ScholarshipApplication" ALTER COLUMN "nationality" SET DEFAULT 'Ghanaian',
ALTER COLUMN "appliedInstitution" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "ScholarshipApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
