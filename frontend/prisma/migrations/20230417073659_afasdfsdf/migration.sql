/*
  Warnings:

  - Made the column `curriculumIds` on table `Course` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Course` MODIFY `curriculumIds` VARCHAR(191) NOT NULL DEFAULT '';
