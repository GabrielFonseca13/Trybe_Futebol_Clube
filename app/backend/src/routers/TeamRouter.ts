import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const TeamRouter = Router();

TeamRouter.get('/', TeamsController.findAll);
TeamRouter.get('/:id', TeamsController.findById);

export default TeamRouter;
