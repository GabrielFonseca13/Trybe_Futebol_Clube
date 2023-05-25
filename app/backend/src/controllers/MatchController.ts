import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

async function getAllMatches(req: Request, res: Response) {
  const { inProgress } = req.query;
  if (inProgress) {
    const matches = await MatchService.findAllInProgress(inProgress === 'true');
    return res.status(200).json(matches);
  }
  const matches = await MatchService.findAll();
  return res.status(200).json(matches);
}

export default {
  getAllMatches,
};
