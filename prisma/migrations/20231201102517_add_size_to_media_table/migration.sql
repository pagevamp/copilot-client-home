/*
  Warnings:

  - Added the required column `size` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "size" INTEGER NOT NULL;
