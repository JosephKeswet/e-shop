/*
  Warnings:

  - Made the column `userId` on table `WalletDetail` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "WalletDetail" DROP CONSTRAINT "WalletDetail_userId_fkey";

-- AlterTable
ALTER TABLE "WalletDetail" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "WalletDetail" ADD CONSTRAINT "WalletDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
