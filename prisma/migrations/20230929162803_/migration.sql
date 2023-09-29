/*
  Warnings:

  - You are about to drop the `WalletDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WalletDetail" DROP CONSTRAINT "WalletDetail_userId_fkey";

-- DropTable
DROP TABLE "WalletDetail";

-- CreateTable
CREATE TABLE "wallet" (
    "walletNumber" TEXT NOT NULL,
    "walletBalance" INTEGER,
    "bankCode" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "wallet_walletNumber_key" ON "wallet"("walletNumber");

-- AddForeignKey
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
