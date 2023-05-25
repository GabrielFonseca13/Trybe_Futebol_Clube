import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

async function findAll(req: Request, res: Response) {
  const matchs = await MatchService.findAll();
  return res.status(200).json(matchs);
}

// async function findById(req: Request, res: Response) {
//   const { id } = req.params;
//   const Match = await MatchService.findById(Number(id));
//   if (!Match) return res.status(404).json({ message: 'Match not found' });
//   return res.status(200).json(Match);
// }

export default {
  findAll,
  // findById,
};
