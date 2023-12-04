/*
  Warnings:

  - You are about to drop the column `bannerImage` on the `Setting` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mediaId]` on the table `Setting` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Setting" DROP COLUMN "bannerImage",
ADD COLUMN     "mediaId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "Setting_mediaId_key" ON "Setting"("mediaId");

-- CreateIndex
CREATE INDEX "mediaId" ON "Setting"("mediaId");

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
