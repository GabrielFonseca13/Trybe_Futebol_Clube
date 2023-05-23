import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

async function findAll(req: Request, res: Response) {
  const teams = await TeamService.findAll();
  return res.status(200).json(teams);
}

async function findById(req: Request, res: Response) {
  const { id } = req.params;
  const team = await TeamService.findById(Number(id));
  if (!team) return res.status(404).json({ message: 'Team not found' });
  return res.status(200).json(team);
}

export default {
  findAll,
  findById,
};
