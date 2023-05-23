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
  describe('Dado um banco vazio usando FindAll', () => {
    it('Retorna um array vazio', async () => {
      // arrange
      sinon.stub(TeamModel, 'findAll').resolves([]);
      // act
      const result = await TeamService.findAll();
      // assert  
      expect(result).to.deep.equal([]);
    })
  });

  describe('Dado um banco populado usando FindAll', () => {
    it('Retorna um array populado com times e Ids', async () => {
      // arrange
      sinon.stub(TeamModel, 'findAll').resolves(allTeamsMock);
      // act
      const result = await TeamService.findAll();
      // assert
      result.forEach((time, index) => {
        expect(time).to.deep.equal(allTeamsMock[index]);
      })
    });
  });

  describe('Dado um banco populado busca o time por Id especifico', () => {
    it('Dado um Id válido, deve retornar o time especifico', async () => {
      // arrange
      sinon.stub(TeamModel, 'findOne').resolves(allTeamsMock[0]);
      // act
      const result = await TeamService.findById(1);
      // assert
      expect(result).to.deep.equal(allTeamsMock[0]);
    });
    it('Dado um Id inválido, deve lançar um erro de NotFound', async () => {
      // arrange
      sinon.stub(TeamModel, 'findOne').resolves(undefined);
      // act
      const result = await TeamService.findById(99);
      // assert
      expect(result).to.be.equal(null);
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

