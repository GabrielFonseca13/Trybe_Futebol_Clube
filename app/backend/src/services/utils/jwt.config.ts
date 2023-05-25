// import * as jwt from 'jsonwebtoken';

export const secret = 'jwt_secret';

export const config: object = {
  expiresIn: '6h',
  algorithm: 'HS256',
};

// export const validateToken = (token?: string) => {
//   if (!token) {
//     return {
//       error: {
//         code: 'tokenNotFound',
//         message: 'Token not found',
//       },
//     };
//   }

//   const isValid = jwt.verify(token, secret);
//   return isValid;
// };

// // export {
//   validateToken,
// };
