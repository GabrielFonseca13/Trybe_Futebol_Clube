// import * as jwt from 'jsonwebtoken';

export const secret = 'jwt_secret';

export type JwtPayload = {
  id: string,
  username: string,
  role: string,
  email: string,
  iat?: number
};

// export const config: object = {
//   expiresIn: '6h',
//   algorithm: 'HS256',
// };

// export function verify(token: string): JwtPayload {
//   const decoded = jwt.verify(token, 'SECRET');
//   console.log('DECODED', decoded);
//   return decoded as JwtPayload;
// }
