/*
  Warnings:

  - You are about to drop the column `mediaId` on the `Setting` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bannerImageId]` on the table `Setting` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Setting" DROP CONSTRAINT "Setting_mediaId_fkey";

-- DropIndex
DROP INDEX "Setting_mediaId_key";

-- DropIndex
DROP INDEX "mediaId";

-- AlterTable
ALTER TABLE "Setting" DROP COLUMN "mediaId",
ADD COLUMN     "bannerImageId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "Setting_bannerImageId_key" ON "Setting"("bannerImageId");

-- CreateIndex
CREATE INDEX "bannerImageId" ON "Setting"("bannerImageId");

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_bannerImageId_fkey" FOREIGN KEY ("bannerImageId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
