import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { secret } from '../services/utils/jwt.config';

export type AuthenticatedRequest = Request & {
  auth: {
    id: string,
    username: string,
    role: string,
    email: string,
    iat?: number,
  }
};

export default async function authToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const tokenResult = jwt.verify(token, secret);
    req.body.user = { tokenResult };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
