/*
  Warnings:

  - Changed the type of `status` on the `lending` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LendingStatus" AS ENUM ('BORROWED', 'RETURNED');

-- AlterTable
ALTER TABLE "lending" DROP COLUMN "status",
ADD COLUMN     "status" "LendingStatus" NOT NULL;
