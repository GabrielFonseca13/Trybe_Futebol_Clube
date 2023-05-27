export const secret = 'jwt_secret';

export type JwtPayload = {
  id: string,
  username: string,
  role: string,
  email: string,
  iat?: number
};
