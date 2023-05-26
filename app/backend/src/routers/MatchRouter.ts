import { Router } from 'express';
import authToken from '../middlewares/authToken';
import MatchController from '../controllers/MatchController';

const MatchRouter = Router();

MatchRouter.get('/', MatchController.getAllMatches);
MatchRouter.patch('/:id/finish', authToken, MatchController.finishMatch);
MatchRouter.patch('/:id', authToken, MatchController.changeScores);

export default MatchRouter;
