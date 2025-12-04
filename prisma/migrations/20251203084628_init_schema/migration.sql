/*
  Warnings:

  - You are about to drop the column `men` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `sizes` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `women` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `itemCode` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to drop the column `customerId` on the `Query` table. All the data in the column will be lost.
  - You are about to drop the column `query` on the `Query` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Query` table. All the data in the column will be lost.
  - You are about to drop the column `confirmed` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryDate` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryLocation` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `receiptNumber` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `shipped` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `receiptId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `review` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `timeBegin` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `timeEnd` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `ShoppingList` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `ShoppingList` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `WishList` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `WishList` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone_number]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[item_code]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receipt_number]` on the table `Receipt` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[session_id]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone_number` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_code` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Query` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_phone` to the `Query` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_phone` to the `Receipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receipt_number` to the `Receipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_phone` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_id` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_phone` to the `ShoppingList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `ShoppingList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_phone` to the `WishList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `WishList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Query" DROP CONSTRAINT "Query_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_receiptId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_customerId_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingList" DROP CONSTRAINT "ShoppingList_customerId_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingList" DROP CONSTRAINT "ShoppingList_productId_fkey";

-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_customerId_fkey";

-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_productId_fkey";

-- DropIndex
DROP INDEX "Customer_phoneNumber_key";

-- DropIndex
DROP INDEX "Product_itemCode_key";

-- DropIndex
DROP INDEX "Receipt_receiptNumber_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "men",
DROP COLUMN "phoneNumber",
DROP COLUMN "sizes",
DROP COLUMN "women",
ADD COLUMN     "phone_number" TEXT NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
DROP COLUMN "itemCode",
ADD COLUMN     "cat_essential" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cat_men" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cat_women" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "item_code" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "sizes" TEXT[],
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Query" DROP COLUMN "customerId",
DROP COLUMN "query",
DROP COLUMN "type",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "customer_phone" TEXT NOT NULL,
ADD COLUMN     "response" TEXT;

-- AlterTable
ALTER TABLE "Receipt" DROP COLUMN "confirmed",
DROP COLUMN "customerId",
DROP COLUMN "deliveryDate",
DROP COLUMN "deliveryLocation",
DROP COLUMN "receiptNumber",
DROP COLUMN "shipped",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customer_phone" TEXT NOT NULL,
ADD COLUMN     "delivery_date" TIMESTAMP(3),
ADD COLUMN     "delivery_location" TEXT,
ADD COLUMN     "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_shipped" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "receipt_number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "customerId",
DROP COLUMN "receiptId",
DROP COLUMN "review",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "customer_phone" TEXT NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "receipt_id" INTEGER;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "customerId",
DROP COLUMN "duration",
DROP COLUMN "timeBegin",
DROP COLUMN "timeEnd",
ADD COLUMN     "customer_phone" TEXT,
ADD COLUMN     "duration_seconds" INTEGER,
ADD COLUMN     "session_id" TEXT NOT NULL,
ADD COLUMN     "time_begin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "time_end" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ShoppingList" DROP COLUMN "customerId",
DROP COLUMN "productId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customer_phone" TEXT NOT NULL,
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WishList" DROP COLUMN "customerId",
DROP COLUMN "productId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customer_phone" TEXT NOT NULL,
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PurchaseItem" (
    "id" SERIAL NOT NULL,
    "receipt_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DECIMAL(65,30),

    CONSTRAINT "PurchaseItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_number_key" ON "Customer"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Product_item_code_key" ON "Product"("item_code");

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_receipt_number_key" ON "Receipt"("receipt_number");

-- CreateIndex
CREATE UNIQUE INDEX "Session_session_id_key" ON "Session"("session_id");

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_customer_phone_fkey" FOREIGN KEY ("customer_phone") REFERENCES "Customer"("phone_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_receipt_id_fkey" FOREIGN KEY ("receipt_id") REFERENCES "Receipt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_customer_phone_fkey" FOREIGN KEY ("customer_phone") REFERENCES "Customer"("phone_number") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_customer_phone_fkey" FOREIGN KEY ("customer_phone") REFERENCES "Customer"("phone_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_receipt_id_fkey" FOREIGN KEY ("receipt_id") REFERENCES "Receipt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Query" ADD CONSTRAINT "Query_customer_phone_fkey" FOREIGN KEY ("customer_phone") REFERENCES "Customer"("phone_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_customer_phone_fkey" FOREIGN KEY ("customer_phone") REFERENCES "Customer"("phone_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingList" ADD CONSTRAINT "ShoppingList_customer_phone_fkey" FOREIGN KEY ("customer_phone") REFERENCES "Customer"("phone_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingList" ADD CONSTRAINT "ShoppingList_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
