import { NextFunction, Request, Response } from 'express';

const PASSWORD_MIN_LENGTH = 6;

const LoginValidations = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
};

export default LoginValidations;
