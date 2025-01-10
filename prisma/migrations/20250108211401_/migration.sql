/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Filial` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Filial_nome_key" ON "Filial"("nome");
