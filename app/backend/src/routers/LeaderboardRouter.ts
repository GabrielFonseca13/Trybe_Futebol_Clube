import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const LeaderboardRouter = Router();

LeaderboardRouter.get('/', LeaderboardController.getGeneralPerformance);
LeaderboardRouter.get('/home', LeaderboardController.getHomePerformance);
LeaderboardRouter.get('/away', LeaderboardController.getAwayPerformance);

export default LeaderboardRouter;
