/*
  Warnings:

  - A unique constraint covering the columns `[ci]` on the table `Worker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Worker_ci_key" ON "Worker"("ci");
