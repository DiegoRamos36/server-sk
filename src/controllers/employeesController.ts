import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { employeesSchema } from '../models/employeesModel';
import { compare, hash } from 'bcrypt';

const prisma = new PrismaClient();

export const newEmployee = async (req: FastifyRequest, res: FastifyReply) => {
  const { name, username, password, role, filialId } = req.body as {
    name: string;
    username: string;
    password: string;
    role: string;
    filialId: number;
  };
  try {
    const filial = await prisma.filial.findUnique({
      where: { id: filialId },
    });

    if (!filial) {
      return res.status(404).send({ error: 'Filial not found' });
    }

    const funcionario = await prisma.funcionarios.create({
      data: {
        name: name,
        username: username,
        password: await hash(password, 10),
        role: role,
        filialId: filial.id,
      },
    });
    return res.status(201).send({ employeeName: funcionario.name });
  } catch (e) {
    return res
      .status(400)
      .send(
        `Um erro ocorreu: ${e instanceof Error ? e.message : 'Desconhecido'}`,
      );
  }
};

export const authEmployee = async (req: FastifyRequest, res: FastifyReply) => {
  const authEmployeeSchema = employeesSchema.pick({
    username: true,
    password: true,
  });

  const validacao = authEmployeeSchema.safeParse(req.body);

  if (!validacao.success) {
    return res.status(400).send({ error: validacao.error.errors });
  }

  const { username, password } = validacao.data;

  const user = await prisma.funcionarios.findUnique({
    where: { username: username },
  });

  if (!user) {
    return res.status(400).send({ error: 'Email ou senha inválido' });
  }

  const validarSenha = await compare(password, user.password);

  if (!validarSenha) {
    return res.status(400).send({ error: 'Email ou senha inválido' });
  }

  const token = await res.jwtSign({
    id: user.id,
    name: user.name,
    role: user.role,
    filial: user.filialId,
  });
  if (!token) return res.status(400).send('Erro na geração do token');

  return res.send(token);
};

export const getEmployees = async (req: FastifyRequest, res: FastifyReply) => {
  const funcionarios = await prisma.funcionarios.findMany({
    select: {
      id: true,
      username: true,
      role: true,
      name: true,
      filialId: true,
    },
  });
  return res.status(200).send(funcionarios);
};

export const getEmployeeByName = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { name } = req.body as { name: string };

  const employee = await prisma.funcionarios.findFirst({
    where: {
      name: {
        contains: name,
      },
    },
    select: {
      id: true,
      role: true,
      name: true,
      filialId: true,
    },
  });

  return res.send(employee);
};

export const deleteEmployeeById = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { id } = req.body as { id: number };

  if (!id || id <= 0) return res.status(404).send('Insira um id válido!');

  try {
    const deleteEmployee = await prisma.funcionarios.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).send(deleteEmployee.name + ' excluído com sucesso!');
  } catch (e) {
    return res
      .status(400)
      .send(e instanceof Error ? e.message : 'Erro Desconhecido');
  }
};
