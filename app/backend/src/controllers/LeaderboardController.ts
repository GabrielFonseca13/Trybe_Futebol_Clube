import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

async function getHomePerformance(req: Request, res: Response) {
  const homeTeamPerformance = await LeaderboardService.getHomePerformance();
  return res.status(200).json(homeTeamPerformance);
}

async function getAwayPerformance(req: Request, res: Response) {
  const awayTeamPerformance = await LeaderboardService.getAwayPerformance();
  return res.status(200).json(awayTeamPerformance);
}

export default {
  getHomePerformance,
  getAwayPerformance,
};
