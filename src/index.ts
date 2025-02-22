import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { ItemRoutes } from './routes/itemRoutes';
import fastifyCors from '@fastify/cors';
import { authCors } from './utilities/authCors';
import fastifyJwt from '@fastify/jwt';
import dotenv from 'dotenv';
import { EmployeeRoutes } from './routes/employeeRoutes';
import { BranchRoutes } from './routes/branchRoutes';

dotenv.config();
const port = process.env.PORT || 4000;
const app = fastify({
  bodyLimit: 5 * 1024 * 1024,
  disableRequestLogging: true,
  logger: true,
});
app.register(fastifyJwt, {
  secret: process.env.JWT_KEY || '',
});

app.register(ItemRoutes);
app.register(EmployeeRoutes);
app.register(BranchRoutes);

app.register(fastifyCors, authCors);

app.get('/', () => {
  return null;
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port}`);
});
