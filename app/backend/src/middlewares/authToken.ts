// import { NextFunction, Request, Response } from 'express';
// import * as jwt from 'jsonwebtoken';
// import { secret, validateToken } from '../services/utils/jwt.config';

// const authToken = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization;
//   const tokenResult = validateToken(token);
//   if (tokenResult.error && tokenResult.error.code === 'tokenNotFound') {
//     return res.status(401).json({ message: tokenResult.error.message });
//   }

//   next();
// } catch (err) {
//   console.log(err);
//   return res.status(401).json({ message: 'Token must be a valid token' });
// }
// };

// export default authToken;
