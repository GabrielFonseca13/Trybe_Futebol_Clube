import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

async function login(req: Request, res: Response) {
  const { error: serviceError, token } = await LoginService.login(req.body);
  if (serviceError && serviceError.code === 'InvalidValues') {
    return res.status(401).json({ message: serviceError.message });
  }
  return res.status(200).json({ token });
}

// async function getRole(req: Request, _res: Response) {
//   const { email } = req.body.user;
//   const response = await LoginService.getRole(email);
//   // if (response.status === 401) {
//   //   return res.status(response.status).json({ message: response });
//   // }
//   // return res.status(status).json({ role: message });
//   console.log('RESPONSE CONTROLLER', response);
// }

export default {
  login,
  // getRole,
};
