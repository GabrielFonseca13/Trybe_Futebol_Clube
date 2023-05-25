import UserModel from '../../database/models/UserModel'
import { loginParams } from '../../services/LoginService';

export const validEmail: string = 'admin@admin.com';
export const validPassword: string = 'secret_admin';

export const loginParamsMock: loginParams = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

export const loginParamsMockWithoutLogin: loginParams = {
  email: '',
  password: 'secret_admin'
}

export const loginParamsMockWithoutPassword: loginParams = {
  email: 'admin@admin.com',
  password: ''
}

export const loginParamsMockInvalidEmail: loginParams = {
  email: 'InvalidEmail',
  password: '1234567'
}

export const loginParamsMockInvalidPassword: loginParams = {
  email: 'InvalidEmail',
  password: '1234567'
}


export const allUsersMock = [
  {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  },
  {
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
  },
  {
    id: 3,
    username: 'User',
    role: 'user',
    email: '@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
  },
  {
    id: 4,
    username: 'User',
    role: 'user',
    email: 'invalid.user@user.com',
    password: '$2a$10$HDkFwOMKOI6PTza0F7.YRu1Bqsqb9hx7XkuV7QeYB5dRL4z9DI1Mu'
  }
] as UserModel[];
