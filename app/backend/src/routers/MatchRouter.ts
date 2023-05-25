import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const MatchRouter = Router();

MatchRouter.get('/', MatchController.getAllMatches);

export default MatchRouter;
