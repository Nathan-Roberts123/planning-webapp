-- CreateTable
CREATE TABLE "GroupCard" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "GroupCard_id_key" ON "GroupCard"("id");
