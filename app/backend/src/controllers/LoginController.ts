import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

async function login(req: Request, res: Response) {
  const { error: serviceError, token } = await LoginService.login(req.body);
  if (serviceError && serviceError.code === 'InvalidValues') {
    return res.status(401).json({ message: serviceError.message });
  }
  return res.status(200).json({ token });
}

async function getRole(req: Request, res: Response) {
  const { tokenResult } = req.body.user;
  return res.status(200).json({ role: tokenResult.role });
}

export default {
  login,
  getRole,
};
