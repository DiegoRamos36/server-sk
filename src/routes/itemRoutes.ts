import { FastifyPluginCallback } from 'fastify';
import {
  deleteItemById,
  getAllItems,
  getItemByName,
  minusItemById,
  newItem,
  plusItemById,
} from '../controllers/itemController';

export const ItemRoutes: FastifyPluginCallback = (app, options, done) => {
  app.post('/novo-item', newItem);
  app.post('/obter-item', getAllItems);
  app.post('/obter-item-name', getItemByName);
  app.post('/delete-item', deleteItemById);
  app.post('/plus-item', plusItemById);
  app.post('/minus-item', minusItemById);
  done();
};
