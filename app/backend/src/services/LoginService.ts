import { sign } from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import UserModel from '../database/models/UserModel';
import { config, secret } from './utils/jwt.config';

export type loginParams = {
  email: string,
  password: string,
};

class LoginService {
  public static async login(params: loginParams) {
    const user = await UserModel.findOne({ where: { email: params.email } });
    if (!user) {
      return { status: 400, message: 'All fields must be filled' };
    }
    // validar password
    const isValidPassword = bcryptjs.compareSync(params.password, user.password);
    // console.log('params password', params.password);
    // console.log('user password', user.password);
    // console.log('isvalid password', isValidPassword);
    if (!isValidPassword) {
      throw new Error('UNAUTHORIZED');
    }
    const { id, username, role, email } = user;
    const token = sign({ id, username, role, email }, secret, config);
    return { status: 200, message: token };
  }
}

export default LoginService;
