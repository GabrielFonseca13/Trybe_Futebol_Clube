import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import UserModel from '../database/models/UserModel';
import { secret } from './utils/jwt.config';

export type loginParams = {
  email: string,
  password: string,
};

export const INVALID_MESSAGE = 'Invalid email or password';

class LoginService {
  public static async login(params: loginParams) {
    const user = await UserModel.findOne({ where: { email: params.email } });

    if (!user) {
      return { error: { code: 'InvalidValues', message: INVALID_MESSAGE } };
    }

    const isValidPassword = bcryptjs.compareSync(params.password, user.password);
    if (!isValidPassword) {
      return { error: { code: 'InvalidValues', message: INVALID_MESSAGE } };
    }

    const { id, username, role, email } = user;

    const token = jwt.sign({ id, username, role, email }, secret);
    return { token };
  }

  // public static async getRole(email: string) {
  //   const user = await UserModel.findOne({ where: { email } });

  //   if (!user) {
  //     return null;
  //   }
  //   const { role } = user.dataValues;
  //   return role;
  // }
}

export default LoginService;
