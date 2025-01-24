import z from 'zod';

export const employeesSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string().min(6),
  cargo: z.string(),
  endereco: z.string(),
});
