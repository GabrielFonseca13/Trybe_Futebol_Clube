// import { Request, Response } from 'express';
// import UserService from '../services/UserService';

// async function findAll(req: Request, res: Response) {
//   const users = await UserService.findAll();
//   return res.status(200).json(users);
// }

// async function findById(req: Request, res: Response) {
//   const { id } = req.params;
//   const user = await UserService.findById(Number(id));
//   if (!user) return res.status(404).json({ message: 'User not found' });
//   return res.status(200).json(user);
// }

// export default {
//   findAll,
//   findById,
// };
