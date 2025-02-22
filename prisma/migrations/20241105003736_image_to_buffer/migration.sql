/*
  Warnings:

  - You are about to alter the column `localImg` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `String` to `Binary`.

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
    "localImg" BLOB NOT NULL,
    "localDesc" TEXT NOT NULL
);
INSERT INTO "new_Produto" ("createdAt", "expires", "id", "localDesc", "localImg", "name", "quantity", "sentBy") SELECT "createdAt", "expires", "id", "localDesc", "localImg", "name", "quantity", "sentBy" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
