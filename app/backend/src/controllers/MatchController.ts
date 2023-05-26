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

  if (!match) return res.status(404).json({ message: 'Partida não encontrada' });

  if (match?.inProgress !== true) {
    return res.status(400).json({ message: 'Partida já encerrada' });
  }

  await MatchService.finishMatch(Number(id));
  return res.status(200).json({ message: 'Finished' });
}

async function changeScores(req: Request, res: Response) {
  // pegar id no req.params
  const { id } = req.params;
  // pegar o body com os placares home e away
  const matchGoals = req.body;
  // buscar a partida com findbyid
  const match = await MatchService.findMatchById(Number(id));
  // fazer conferencias
  if (!match) return res.status(404).json({ message: 'Partida não encontrada' });

  if (match?.inProgress !== true) {
    return res.status(400).json({ message: 'Partida já encerrada' });
  }
  await MatchService.changeScores(Number(id), matchGoals);
  // fazer a chamada do service que altera o placar para o body;
  // retornar status 200 e qualquer corpo.
  return res.status(200).json({ message: 'Placar alterado' });
}

async function createMatch(req: Request, res: Response) {
  // receber os dados da partida do body
  const newMatchData = req.body;
  // verificas se os campos estao vindo OK - 
  // em caso de erro retornar o status e erros
  // chamar a service para inserir os dados no db.
  const newMatch = await MatchService.createMatch(newMatchData);
  // retornar o status 200 e o corpo da partida criada.
  return res.status(201).json(newMatch);
}

export default {
  getAllMatches,
  finishMatch,
  changeScores,
  createMatch,
};
