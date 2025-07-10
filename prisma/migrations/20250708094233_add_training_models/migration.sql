-- CreateEnum
CREATE TYPE "TrainingStatus" AS ENUM ('Draft', 'Active', 'Completed', 'Cancelled');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('Scheduled', 'In_Progress', 'Completed', 'Cancelled');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('Enrolled', 'In_Progress', 'Completed', 'Dropped', 'No_Show');

-- CreateTable
CREATE TABLE "TrainingProgram" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "duration_hours" INTEGER NOT NULL,
    "max_participants" INTEGER NOT NULL,
    "budget_allocated" DOUBLE PRECISION NOT NULL,
    "trainer_name" TEXT,
    "trainer_email" TEXT,
    "is_external" BOOLEAN NOT NULL DEFAULT false,
    "status" "TrainingStatus" NOT NULL DEFAULT 'Draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainingProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingSession" (
    "id" TEXT NOT NULL,
    "program_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "max_participants" INTEGER NOT NULL,
    "cost_per_participant" DOUBLE PRECISION NOT NULL,
    "status" "SessionStatus" NOT NULL DEFAULT 'Scheduled',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainingSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingEnrollment" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "program_id" TEXT NOT NULL,
    "session_id" TEXT,
    "enrollment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'Enrolled',
    "completion_date" TIMESTAMP(3),
    "certificate_issued" BOOLEAN NOT NULL DEFAULT false,
    "feedback_rating" INTEGER,
    "feedback_comments" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainingEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrainingEnrollment_employee_id_program_id_session_id_key" ON "TrainingEnrollment"("employee_id", "program_id", "session_id");

-- AddForeignKey
ALTER TABLE "TrainingSession" ADD CONSTRAINT "TrainingSession_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "TrainingProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingEnrollment" ADD CONSTRAINT "TrainingEnrollment_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingEnrollment" ADD CONSTRAINT "TrainingEnrollment_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "TrainingProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingEnrollment" ADD CONSTRAINT "TrainingEnrollment_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "TrainingSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;
