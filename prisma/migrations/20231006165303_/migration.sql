/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Cart_quantity_key";

-- CreateIndex
CREATE UNIQUE INDEX "Cart_id_key" ON "Cart"("id");
