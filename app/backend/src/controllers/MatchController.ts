import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import TeamService from '../services/TeamService';

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

  if (!match) return res.status(404).json({ message: 'Partida não encontrada' });

  if (match?.inProgress !== true) {
    return res.status(400).json({ message: 'Partida já encerrada' });
  }

  await MatchService.finishMatch(Number(id));
  return res.status(200).json({ message: 'Finished' });
}

async function changeScores(req: Request, res: Response) {
  const { id } = req.params;
  const matchGoals = req.body;

  const match = await MatchService.findMatchById(Number(id));
  if (!match) return res.status(404).json({ message: 'Partida não encontrada' });

  if (match?.inProgress !== true) return res.status(400).json({ message: 'Partida já encerrada' });
  await MatchService.changeScores(Number(id), matchGoals);

  return res.status(200).json({ message: 'Placar alterado' });
}

async function createMatch(req: Request, res: Response) {
  const newMatchData = req.body;
  const { homeTeamId, awayTeamId } = newMatchData;

  if (homeTeamId === awayTeamId) {
    res.status(422).json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const homeTeamsExists = await TeamService.findById(homeTeamId);
  if (!homeTeamsExists) return res.status(404).json({ message: 'There is no team with such id!' });

  const awayTeamExists = await TeamService.findById(awayTeamId);
  if (!awayTeamExists) return res.status(404).json({ message: 'There is no team with such id!' });

  const newMatch = await MatchService.createMatch(newMatchData);

  return res.status(201).json(newMatch);
}

export default {
  getAllMatches,
  finishMatch,
  changeScores,
  createMatch,
};
