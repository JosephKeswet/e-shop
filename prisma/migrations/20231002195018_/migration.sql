/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `cart` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "cart_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "cart_id_key" ON "cart"("id");
