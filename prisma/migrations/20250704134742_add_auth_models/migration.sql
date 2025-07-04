/*
  Warnings:

  - The `requirements` column on the `JobPosting` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `applicationDeadline` to the `JobPosting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactEmail` to the `JobPosting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `JobPosting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaryMax` to the `JobPosting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaryMin` to the `JobPosting` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `location` on the `JobPosting` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `JobPosting` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('Full-time', 'Part-time', 'Contract', 'Internship');

-- CreateEnum
CREATE TYPE "JobLevel" AS ENUM ('Entry', 'Mid', 'Senior', 'Lead', 'Executive');

-- CreateEnum
CREATE TYPE "JobLocation" AS ENUM ('Remote', 'Office', 'Hybrid');

-- AlterTable
ALTER TABLE "JobPosting" ADD COLUMN     "applicationDeadline" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "benefits" TEXT[],
ADD COLUMN     "contactEmail" TEXT NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "level" "JobLevel" NOT NULL,
ADD COLUMN     "posted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "responsibilities" TEXT[],
ADD COLUMN     "salaryMax" INTEGER NOT NULL,
ADD COLUMN     "salaryMin" INTEGER NOT NULL,
DROP COLUMN "location",
ADD COLUMN     "location" "JobLocation" NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "JobType" NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
DROP COLUMN "requirements",
ADD COLUMN     "requirements" TEXT[],
ALTER COLUMN "status" SET DEFAULT 'Draft';

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobPosting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
