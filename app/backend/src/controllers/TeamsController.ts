import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

async function findAll(req: Request, res: Response) {
  const teams = await TeamService.findAll();
  return res.status(200).json(teams);
}

export default {
  findAll,
};
