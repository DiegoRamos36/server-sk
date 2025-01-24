/*
  Warnings:

  - You are about to drop the column `nome` on the `Funcionarios` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Funcionarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'Administrador',
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "filialId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Funcionarios_filialId_fkey" FOREIGN KEY ("filialId") REFERENCES "Filial" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Funcionarios" ("createdAt", "filialId", "id", "password", "role", "updatedAt", "username") SELECT "createdAt", "filialId", "id", "password", "role", "updatedAt", "username" FROM "Funcionarios";
DROP TABLE "Funcionarios";
ALTER TABLE "new_Funcionarios" RENAME TO "Funcionarios";
CREATE UNIQUE INDEX "Funcionarios_username_key" ON "Funcionarios"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
