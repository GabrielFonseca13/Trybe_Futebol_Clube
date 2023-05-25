import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/TeamModel';

import { Response } from 'superagent';
import LoginService, { INVALID_MESSAGE } from '../services/LoginService';
import {
  allUsersMock,
  loginParamsMock,
  loginParamsMockInvalidEmail,
  loginParamsMockWithoutLogin,
  loginParamsMockWithoutPassword
} from './mocks/loginMock.test';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de Login', () => {
  afterEach(function () {
    sinon.restore()
  });
  describe('Enviando dados válidos', () => {
    it('Retorna um status 200 e um token', async () => {
      // arrange
      sinon.stub(UserModel, 'findOne').resolves(allUsersMock[0]);
      // act
      const result = await LoginService.login(loginParamsMock)
      // assert  
      expect(result.token).not.to.be.empty;
    })
  });
  describe('Enviando dados inválidos', () => {
    it('Enviando requisição sem email', async () => {
      // arrange
      sinon.stub(UserModel, 'findOne').resolves();
      // act
      const result = await LoginService.login(loginParamsMockWithoutLogin)
      // assert  
      expect(result.error?.code).to.equal('InvalidValues');
      expect(result.error?.message).to.be.equal(INVALID_MESSAGE)
    });
    // it('Enviando requisição com email no formato inválido', async () => {
    //   // arrange
    //   sinon.stub(UserModel, 'findOne').resolves();
    //   // act
    //   const result = await LoginService.login(loginParamsMockInvalidEmail)
    //   console.log(result);
    //   // assert  
    //   expect(result.status).to.equal(400);
    //   expect(result.message).to.be.equal('Email Format Invalid')
    // })
  });
});