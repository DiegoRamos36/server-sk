import fastify from 'fastify';

import { ItemRoutes } from './routes/itemRoutes';
import fastifyCors from '@fastify/cors';
import { authCors } from './utilities/authCors';
import fastifyJwt from '@fastify/jwt';
import dotenv from 'dotenv';
import { EmployeeRoutes } from './routes/employeeRoutes';

dotenv.config();
const port = process.env.PORT || 4000;
const app = fastify();
app.register(fastifyJwt, {
  secret: process.env.JWT_KEY || '',
});

app.register(ItemRoutes);
app.register(EmployeeRoutes);
app.register(fastifyCors, authCors);

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port}`);
});
