import { Funcionarios } from '@prisma/client';

export const generateToken = (jwt: any, funcionarios: Funcionarios) => {
  return jwt.sign({
    id: funcionarios.id,
    cargo: funcionarios.cargo,
    name: funcionarios.nome,
  });
};
