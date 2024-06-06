/*
  Warnings:

  - Added the required column `groupId` to the `GroupCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupCard" ADD COLUMN     "groupId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "GroupCard" ADD CONSTRAINT "GroupCard_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
