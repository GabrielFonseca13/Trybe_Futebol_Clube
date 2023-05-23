import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const TeamRouter = Router();

TeamRouter.get('/', TeamsController.findAll);

export default TeamRouter;
