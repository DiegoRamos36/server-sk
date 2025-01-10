/*
  Warnings:

  - You are about to alter the column `filialId` on the `Estoque` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Filial` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Filial` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `filialId` on the `Funcionarios` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Estoque" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "produtoId" INTEGER NOT NULL,
    "filialId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Estoque_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Estoque_filialId_fkey" FOREIGN KEY ("filialId") REFERENCES "Filial" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Estoque" ("filialId", "id", "produtoId", "quantidade", "updatedAt") SELECT "filialId", "id", "produtoId", "quantidade", "updatedAt" FROM "Estoque";
DROP TABLE "Estoque";
ALTER TABLE "new_Estoque" RENAME TO "Estoque";
CREATE TABLE "new_Filial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Filial" ("createdAt", "endereco", "id", "nome") SELECT "createdAt", "endereco", "id", "nome" FROM "Filial";
DROP TABLE "Filial";
ALTER TABLE "new_Filial" RENAME TO "Filial";
CREATE UNIQUE INDEX "Filial_nome_key" ON "Filial"("nome");
CREATE TABLE "new_Funcionarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "filialId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Funcionarios_filialId_fkey" FOREIGN KEY ("filialId") REFERENCES "Filial" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Funcionarios" ("createdAt", "filialId", "id", "nome", "password", "role", "updatedAt", "username") SELECT "createdAt", "filialId", "id", "nome", "password", "role", "updatedAt", "username" FROM "Funcionarios";
DROP TABLE "Funcionarios";
ALTER TABLE "new_Funcionarios" RENAME TO "Funcionarios";
CREATE UNIQUE INDEX "Funcionarios_username_key" ON "Funcionarios"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
