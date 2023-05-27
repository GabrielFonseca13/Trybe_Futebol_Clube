import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const LeaderboardRouter = Router();

LeaderboardRouter.get('/home', LeaderboardController.getHomePerformance);

export default LeaderboardRouter;
