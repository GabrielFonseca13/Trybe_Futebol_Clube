import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

async function login(req: Request, res: Response) {
  const { status, message } = await LoginService.login(req.body);
  return res.status(status).json({ token: message });
}

export default {
  login,
};
