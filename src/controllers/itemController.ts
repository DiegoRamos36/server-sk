import { FastifyReply, FastifyRequest } from 'fastify';
import { productSchema } from '../models/itemModel';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const newItem = async (req: FastifyRequest, res: FastifyReply) => {
  const data = req.body as {
    name: string;
    localDesc: string;
    imagemUrl: string;
    quantity: number;
    sentBy: string;
    categoria: string;
    filialId: number;
    expires: string;
  };

  const item = await prisma.produto.create({
    data: {
      name: data.name,
      localDesc: data.localDesc,
      imagemUrl: data.imagemUrl,
      quantity: data.quantity,
      sentBy: data.sentBy,
      categoria: data.categoria,
      expires: data.expires,
    },
  });

  await prisma.estoque.create({
    data: {
      produtoId: item.id,
      filialId: data.filialId,
      quantidade: data.quantity,
    },
  });
  return res.status(201).send({ itemId: item.id, itemName: item.name });
};

export const getAllItems = async (req: FastifyRequest, res: FastifyReply) => {
  const { filialId } = req.body as { filialId: number };

  try {
    if (!filialId || filialId <= 0) throw new Error('Id inválido');

    const stock = await prisma.estoque.findMany({
      where: { filialId },
      include: {
        produto: true,
      },
    });

    if (stock.length === 0) {
      return res.status(404).send({ message: 'Nenhum item encontrado' });
    }

    return res.status(200).send(stock);
  } catch (e) {
    return res
      .status(500)
      .send(
        `Um erro ocorreu: ${e instanceof Error ? e.message : 'Desconhecido'}`,
      );
  }
};

export const getItemByName = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { name, filialId } = req.body as { name: string; filialId: number };

    if (!name || !filialId) {
      return res
        .status(400)
        .send({ error: 'Nome e ID da filial são obrigatórios' });
    }

    const item = await prisma.estoque.findFirst({
      where: {
        produto: {
          name: {
            contains: name,
          },
        },
        filialId: filialId,
      },
      include: {
        produto: true,
      },
    });

    if (!item) {
      return res.status(404).send({ message: 'Item não encontrado na filial' });
    }

    return res.status(200).send(item);
  } catch (e) {
    return res
      .status(500)
      .send(
        `Um erro ocorreu: ${e instanceof Error ? e.message : 'Desconhecido'}`,
      );
  }
};

export const deleteItemById = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { id } = req.body as { id: string };

  const estoque = await prisma.estoque.deleteMany({
    where: {
      produtoId: Number(id),
    },
  });

  const produto = await prisma.produto.delete({
    where: {
      id: parseInt(id),
    },
  });
};

export const plusItemById = async (req: FastifyRequest, res: FastifyReply) => {
  const { id, quantity } = req.body as { id: number; quantity: number };

  try {
    if (!id || !quantity || id <= 0 || quantity <= 0) {
      return res
        .status(400)
        .send({ message: 'Preencha corretamente os dados' });
    }

    const produto = await prisma.produto.update({
      where: {
        id: id,
      },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });

    res.status(200).send(produto);
  } catch (e) {
    return res
      .status(500)
      .send(
        `Um erro ocorreu: ${e instanceof Error ? e.message : 'Desconhecido'}`,
      );
  }
};

//diminuir quantidade por id

export const minusItemById = async (req: FastifyRequest, res: FastifyReply) => {
  const { id, quantity } = req.body as { id: number; quantity: number };

  const produto = await prisma.produto.update({
    where: {
      id: id,
    },
    data: {
      quantity: {
        decrement: quantity,
      },
    },
  });

  res.status(200).send(produto);
};
