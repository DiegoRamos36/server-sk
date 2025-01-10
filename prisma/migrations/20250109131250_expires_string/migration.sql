-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL,
    "expires" TEXT NOT NULL,
    "sentBy" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "localDesc" TEXT NOT NULL
);
INSERT INTO "new_Produto" ("categoria", "createdAt", "expires", "id", "imagemUrl", "localDesc", "name", "quantity", "sentBy") SELECT "categoria", "createdAt", "expires", "id", "imagemUrl", "localDesc", "name", "quantity", "sentBy" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
