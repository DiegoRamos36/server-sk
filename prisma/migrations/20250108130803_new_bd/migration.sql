/*
  Warnings:

  - You are about to drop the column `cargo` on the `Funcionarios` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `Funcionarios` table. All the data in the column will be lost.
  - You are about to drop the column `localImg` on the `Produto` table. All the data in the column will be lost.
  - You are about to alter the column `createdAt` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `expires` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - Added the required column `filialId` to the `Funcionarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Funcionarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Funcionarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagemUrl` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Filial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Estoque" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "produtoId" INTEGER NOT NULL,
    "filialId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Estoque_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Estoque_filialId_fkey" FOREIGN KEY ("filialId") REFERENCES "Filial" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Funcionarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "filialId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Funcionarios_filialId_fkey" FOREIGN KEY ("filialId") REFERENCES "Filial" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Funcionarios" ("id", "nome", "password", "username") SELECT "id", "nome", "password", "username" FROM "Funcionarios";
DROP TABLE "Funcionarios";
ALTER TABLE "new_Funcionarios" RENAME TO "Funcionarios";
CREATE UNIQUE INDEX "Funcionarios_username_key" ON "Funcionarios"("username");
CREATE TABLE "new_Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,
    "expires" DATETIME NOT NULL,
    "sentBy" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "localDesc" TEXT NOT NULL
);
INSERT INTO "new_Produto" ("createdAt", "expires", "id", "localDesc", "name", "quantity", "sentBy") SELECT "createdAt", "expires", "id", "localDesc", "name", "quantity", "sentBy" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
