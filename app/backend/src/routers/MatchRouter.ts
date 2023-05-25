import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const MatchRouter = Router();

MatchRouter.get('/', MatchController.findAll);
// MatchRouter.get('/:id', MatchController.findById);

export default MatchRouter;
