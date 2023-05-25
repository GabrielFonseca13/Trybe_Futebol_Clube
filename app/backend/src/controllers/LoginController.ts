import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

async function login(req: Request, res: Response) {
  const { status, message } = await LoginService.login(req.body);
  if (status === 401) {
    return res.status(status).json({ message });
  }
  return res.status(status).json({ token: message });
}

export default {
  login,
};
