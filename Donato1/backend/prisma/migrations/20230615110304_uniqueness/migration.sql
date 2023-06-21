/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `Departments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[description]` on the table `Jobs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[description]` on the table `States` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Departments_description_key" ON "Departments"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Jobs_description_key" ON "Jobs"("description");

-- CreateIndex
CREATE UNIQUE INDEX "States_description_key" ON "States"("description");
