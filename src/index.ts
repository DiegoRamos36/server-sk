import fastify from 'fastify';
import { authRoutes } from './routes/authRoutes';
import { couponRoutes } from './routes/couponRoutes';
import { ItemRoutes } from './routes/itemRoutes';
import fastifyCors from '@fastify/cors';
import { authCors } from './utilities/authCors';
import fastifyJwt from '@fastify/jwt';
import dotenv from 'dotenv';
import { orderRoutes } from './routes/orderRoutes';
import { addressRoutes } from './routes/addressRoutes';

dotenv.config();

const app = fastify();
app.register(fastifyJwt, {
  secret: process.env.JWT_KEY || '',
});
app.register(authRoutes);
app.register(couponRoutes);
app.register(ItemRoutes);
app.register(orderRoutes);
app.register(addressRoutes);
app.register(fastifyCors, authCors);

app.listen({ port: 8081 }).then(() => {
  console.log('Servidor rodando na porta 8081');
});