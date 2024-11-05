import { FastifyReply, FastifyRequest } from 'fastify';
import { productSchema } from '../models/itemModel';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type ItemBody = {
  name: string;
  quantity: number;
  sent: string;
  localImg: string;
  localDesc: string;
};

export const newItem = async (req: FastifyRequest, res: FastifyReply) => {
  const data = productSchema.parse(req.body);

  const item = await prisma.produto.create({
    data: {
      name: data.name,
      createdAt: data.createdAt,
      localDesc: data.localDesc,
      localImg: data.localImg,
      quantity: data.quantity,
      sentBy: data.sentBy,
      expires: data.expires,
    },
  });
  return res.status(201).send({ itemId: item.id });
};

// ver todos os itens
export const getAllItems = async (req: FastifyRequest, res: FastifyReply) => {
  const stock = await prisma.produto.findMany();
  return stock;
};

// ver item por nome
export const getItemByName = async (req: FastifyRequest, res: FastifyReply) => {
  const { name } = req.body as { name: string };

  const item = await prisma.produto.findFirst({
    where: {
      name: {
        contains: name,
      },
    },
  });

  return res.send(item);
};

// excluir item por id
export const deleteItemById = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { id } = req.body as { id: string };
  const deletarItem = await prisma.produto.delete({
    where: {
      id: parseInt(id),
    },
  });
};

// editar item
export const editItemById = async (req: FastifyRequest, res: FastifyReply) => {
  const { id } = req.params as { id: string };
  const { name, quantity, sent, localDesc, localImg } = req.body as {
    name: string;
    quantity: number;
    sent: string;
    localImg: string;
    localDesc: string;
  };
  const itemAtualizado: Partial<ItemBody> = {};

  if (name !== undefined) itemAtualizado.name = name;
  if (sent !== undefined) itemAtualizado.sent = sent;
  if (quantity !== undefined) itemAtualizado.quantity = quantity;
  if (localImg !== undefined) itemAtualizado.localImg = localImg;
  if (localDesc !== undefined) itemAtualizado.localDesc = localDesc;

  const atualizarItem = await prisma.produto.update({
    where: {
      id: parseInt(id),
    },
    data: itemAtualizado,
  });

  return res.send(atualizarItem);
};
