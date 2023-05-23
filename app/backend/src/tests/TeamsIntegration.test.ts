import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import TeamModel from '../database/models/TeamModel';
import { allTeamsMock } from './mocks/teamModel.mocks.test';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams Router', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('GET /teams', () => {
    describe('Dado uma requisição válida', () => {
      it('Deve retornar status 200 e a lista de times', async () => {
        // arrange => dado um contexto
        sinon.stub(TeamModel, 'findAll').resolves(allTeamsMock)
        // act => ao executar um código
        const result = await chai.request(app)
          .get('/teams');
        // assert => espero um resultado
        expect(result.status).to.be.equal(200);
        expect(result.body).to.be.deep.equal(allTeamsMock);
      });
    });
  });
  describe('GET /teams/:id', () => {
    describe('Dado uma requisição válida para listar time especifico atraves do id', () => {
      it('Deve retornar status 200 e o time', async () => {
        // arrange => dado um contexto
        sinon.stub(TeamModel, 'findByPk').resolves(allTeamsMock[0])
        // act => ao executar um código
        const result = await chai.request(app)
          .get('/teams/1')
        // assert => espero um resultado
        expect(result.status).to.be.equal(200);
        expect(result.body).to.be.deep.equal(allTeamsMock[0]);
      });
    });
    describe('Dado uma requisição com id inválida', () => {
      it('Deve retornar status 404 e o mensagem de erro', async () => {
        // arrange => dado um contexto
        sinon.stub(TeamModel, 'findByPk').resolves(undefined)
        // act => ao executar um código
        const result = await chai.request(app)
          .get('/teams/999')
        // assert => espero um resultado
        expect(result.status).to.be.equal(404);
        expect(result.body).to.be.deep.equal({
          "message": "Team not found"
        });
      });
    });
  });
});
