/*
  Warnings:

  - A unique constraint covering the columns `[quantity]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Cart_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Cart_quantity_key" ON "Cart"("quantity");
