import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { ItemRoutes } from './routes/itemRoutes';
import fastifyCors from '@fastify/cors';
import { authCors } from './utilities/authCors';
import fastifyJwt from '@fastify/jwt';
import dotenv from 'dotenv';
import { EmployeeRoutes } from './routes/employeeRoutes';

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
app.register(fastifyCors, authCors);

export default async function (req: FastifyRequest, res: FastifyReply) {
  await app.ready();
  return app.server.emit('request', req, res);
}
