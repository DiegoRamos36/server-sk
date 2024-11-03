/*
  Warnings:

  - You are about to drop the column `sent` on the `Produto` table. All the data in the column will be lost.
  - Added the required column `expires` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentBy` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "expires" TEXT NOT NULL,
    "sentBy" TEXT NOT NULL,
    "localImg" TEXT NOT NULL,
    "localDesc" TEXT NOT NULL
);
INSERT INTO "new_Produto" ("createdAt", "id", "localDesc", "localImg", "name", "quantity") SELECT "createdAt", "id", "localDesc", "localImg", "name", "quantity" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
