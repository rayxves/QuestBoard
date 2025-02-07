-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "incorrect_answers" TEXT[] DEFAULT ARRAY[]::TEXT[];
