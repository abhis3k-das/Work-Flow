/*
  Warnings:

  - You are about to drop the column `invitedById` on the `Invitation` table. All the data in the column will be lost.
  - Added the required column `invitedBy` to the `Invitation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_invitedById_fkey";

-- AlterTable
ALTER TABLE "Invitation" DROP COLUMN "invitedById",
ADD COLUMN     "invitedBy" TEXT NOT NULL;
