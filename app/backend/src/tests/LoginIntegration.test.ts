import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { allUsersMock, loginParamsMock } from './mocks/loginMock.test';
import UserModel from '../database/models/UserModel';
import { INVALID_MESSAGE } from '../services/LoginService';
// import LoginService from '../services/LoginService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Router', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('Post /login', () => {
    describe('Dado uma requisição válida', () => {
      it('Deve retornar status 200 e Um token', async () => {
        // arrange => dado um contexto
        sinon.stub(UserModel, 'findOne').resolves(allUsersMock[0])
        // act => ao executar um código
        const result = await chai.request(app)
          .post('/login')
          .send(loginParamsMock);
        // assert => espero um resultado
        expect(result.status).to.be.equal(200);
        expect(result.body.token).not.to.be.empty;
      });
    });
    describe('Dado que a senha ou email estão inválidos', () => {
      it('senha no formato invalido deve retornar 401 e mensagem de erro', async () => {
        sinon.stub(UserModel, 'findOne').resolves(undefined);

        const result = await chai.request(app)
          .post('/login')
          .send({
            email: 'email@email.com',
            password: 'pass',
          });

        expect(result.status).to.equal(401);
        expect(result.body.message).to.be.equal(INVALID_MESSAGE);
      });
      it('email no formato invalido deve retornar 401 e mensagem de erro', async () => {
        sinon.stub(UserModel, 'findOne').resolves(undefined);

        const result = await chai.request(app)
          .post('/login')
          .send({
            email: 'InvalidEmail',
            password: 'password',
          });

        expect(result.status).to.equal(401);
        expect(result.body.message).to.be.equal('Invalid email or password');
      });
    });
    describe('Dado que a senha ou email Não forma enviados na requisição', () => {
      it('senha nao enviada deve retornar 400 e mensagem de erro', async () => {
        sinon.stub(UserModel, 'findOne').resolves(undefined);

        const result = await chai.request(app)
          .post('/login')
          .send({
            email: 'email@email.com',
          });

        expect(result.status).to.equal(400);
        expect(result.body.message).to.be.equal('All fields must be filled');
      });
      it('email nao enviado deve retornar 400 e mensagem de erro', async () => {
        sinon.stub(UserModel, 'findOne').resolves(undefined);

        const result = await chai.request(app)
          .post('/login')
          .send({
            password: 'password'
          });

        expect(result.status).to.equal(400);
        expect(result.body.message).to.be.equal('All fields must be filled');
      });
    });
  });
});
  // describe('GET /login/role', () => {
  //   describe('Dado uma requisição inválida', () => {
  //     it('Enviando requisição sem token Deve retornar status 401 e o erro', async () => {
  //       // arrange => dado um contexto
  //       sinon.stub(UserModel, 'findOne').resolves(undefined)
  //       // act => ao executar um código
  //       const result = await chai.request(app)
  //         .get('/login/role')
  //       // assert => espero um resultado
  //       expect(result.status).to.be.equal(200);
  //       expect(result.body.token).not.to.be.empty;
  //     });
  // });
  // describe('Dado uma requisição válida', () => {
  //   it('Deve retornar status 200 e o role', async () => {
  //     // arrange => dado um contexto
  //     sinon.stub(UserModel, 'findOne').resolves(allUsersMock[0])
  //     // act => ao executar um código
  //     const result = await chai.request(app)
  //       .post('/login')
  //       .send(loginParamsMock);
  //     // assert => espero um resultado
  //     expect(result.status).to.be.equal(200);
  //     expect(result.body.token).not.to.be.empty;
  //   });
  // });
  // });
// });
