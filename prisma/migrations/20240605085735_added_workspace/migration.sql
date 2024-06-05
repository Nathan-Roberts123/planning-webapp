-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "boardId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_id_key" ON "Workspace"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_userId_key" ON "Workspace"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_boardId_key" ON "Workspace"("boardId");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
