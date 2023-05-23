import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';

import { Response } from 'superagent';
import { allTeamsMock } from './mocks/teamModel.mocks.test';
import TeamService from '../services/TeamService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de Teams', () => {
  afterEach(function () {
    sinon.restore()
  });
  describe('Dado um banco vazio', () => {
    it('Retorna um array vazio', async () => {
      // arrange
      sinon.stub(TeamModel, 'findAll').resolves([]);
      // act
      const result = await TeamService.findAll();
      // assert  
      expect(result).to.deep.equal([]);
    })
  });

  describe('Dado um banco populado', () => {
    it('Retorna um array populado com times e Ids', async () => {
      // arrange
      sinon.stub(TeamModel, 'findAll').resolves(allTeamsMock);
      // act
      const result = await TeamModel.findAll();
      // assert
      result.forEach((time, index) => {
        expect(time).to.deep.equal(allTeamsMock[index]);
      })
    });
  });


});


// let chaiHttpResponse: Response;

// before(async () => {
//   sinon
//     .stub(TeamModel, "findOne")
//     .resolves({
//       ...<Seu mock >
//     } as TeamModel);
// });

// after(() => {
//   (TeamModel.findOne as sinon.SinonStub).restore();
// })

// it('...', async () => {
//   chaiHttpResponse = await chai
//     .request(app)
//      ...

//   expect(...)
// });


/**
 * Exemplo do uso de stubs com tipos
 */


// it('Seu sub-teste', () => {
//   expect(false).to.be.eq(true);
// });

