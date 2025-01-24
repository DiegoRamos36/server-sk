import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import {
  allBranches,
  branchById,
  deleteBranch,
  newBranch,
} from '../controllers/branchController';

export const BranchRoutes: FastifyPluginCallback = (app, options, done) => {
  app.post('/registrar-filial', newBranch);
  app.post('/deletar-filial', deleteBranch);
  app.get('/ver-filial', allBranches);
  app.get('/ver-filial-id', branchById);

  done();
};
