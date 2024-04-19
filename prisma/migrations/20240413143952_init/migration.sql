/*
  Warnings:

  - The primary key for the `address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `state` on the `address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(28)`.
  - You are about to alter the column `city` on the `address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(28)`.
  - You are about to alter the column `subcity` on the `address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(28)`.
  - You are about to alter the column `location` on the `address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(28)`.
  - The `userId` column on the `address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `notifications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `notifications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userId` column on the `notifications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `passwords` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `passwords` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `value` on the `passwords` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(80)`.
  - The primary key for the `subscriptions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `subscriptions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userId` column on the `subscriptions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `firstName` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(28)`.
  - You are about to alter the column `lastName` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(28)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(28)`.
  - You are about to alter the column `phone` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(14)`.
  - You are about to alter the column `image` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(28)`.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `userId` on the `passwords` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `bio` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urls` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_userId_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_userId_fkey";

-- DropForeignKey
ALTER TABLE "passwords" DROP CONSTRAINT "passwords_userId_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_userId_fkey";

-- AlterTable
ALTER TABLE "address" DROP CONSTRAINT "address_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "state" SET DATA TYPE VARCHAR(28),
ALTER COLUMN "city" SET DATA TYPE VARCHAR(28),
ALTER COLUMN "subcity" SET DATA TYPE VARCHAR(28),
ALTER COLUMN "location" SET DATA TYPE VARCHAR(28),
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER,
ADD CONSTRAINT "address_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER,
ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "passwords" DROP CONSTRAINT "passwords_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "value" SET DATA TYPE VARCHAR(80),
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "passwords_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER,
ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ADD COLUMN     "bio" VARCHAR(28) NOT NULL,
ADD COLUMN     "urls" VARCHAR(28) NOT NULL,
ADD COLUMN     "username" VARCHAR(18),
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(28),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(28),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(28),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(14),
ALTER COLUMN "image" SET DATA TYPE VARCHAR(28),
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "address_userId_key" ON "address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "passwords_userId_key" ON "passwords"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "passwords" ADD CONSTRAINT "passwords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
