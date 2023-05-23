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
});
