import { PrismaClient } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

const prisma = new PrismaClient();

export const newBranch = async (req: FastifyRequest, res: FastifyReply) => {
  const { nome, endereco } = req.body as { nome: string; endereco: string };
  try {
    if (!nome || !endereco) throw new Error('Preencha todos os campos!');

    const branch = await prisma.filial.create({
      data: {
        nome: nome,
        endereco: endereco,
      },
    });

    return res.status(201).send({ branchName: branch.nome });
  } catch (e) {
    return res
      .status(400)
      .send(
        `Um erro ocorreu: ${e instanceof Error ? e.message : 'Desconhecido'}`,
      );
  }
};

export const deleteBranch = async (req: FastifyRequest, res: FastifyReply) => {
  const { id } = req.body as { id: number };
  try {
    if (!id || id === 0) throw new Error('Preencha todos os campos!');

    const branch = await prisma.filial.delete({
      where: {
        id: id,
      },
    });
    return res.status(201).send({ deletedBranch: branch.nome + ' Deletada!' });
  } catch (error) {
    return res
      .status(400)
      .send(
        `Um erro ocorreu: ${
          error instanceof Error ? error.message : 'Desconhecido'
        }`,
      );
  }
};

export const allBranches = async (req: FastifyRequest, res: FastifyReply) => {
  const branches = await prisma.filial.findMany();

  res.status(200).send(branches);
};
