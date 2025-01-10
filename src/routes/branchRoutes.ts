import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { deleteBranch, newBranch } from '../controllers/branchController';

export const BranchRoutes: FastifyPluginCallback = (app, options, done) => {
  app.post('/registrar-filial', newBranch);
  app.post('/deletar-filial', deleteBranch);

  done();
};
