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

async function finishMatch(req: Request, res: Response) {
  const { id } = req.params;
  const match = await MatchService.findMatchById(Number(id));

  if (!match) return res.status(404).json({ message: '#RASCUNHO# Partida não encontrada' });

  if (match?.inProgress !== true) {
    return res.status(400).json({ message: '#RASCUNHO# Partida já encerrada' });
  }

  await MatchService.finishMatch(Number(id));
  return res.status(200).json({ message: 'Finished' });
}

export default {
  getAllMatches,
  finishMatch,
};
