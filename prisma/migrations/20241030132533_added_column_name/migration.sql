-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sent" TEXT NOT NULL,
    "localImg" TEXT NOT NULL,
    "localDesc" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Funcionarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "endereco" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Funcionarios_username_key" ON "Funcionarios"("username");
