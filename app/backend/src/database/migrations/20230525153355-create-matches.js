'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'matches', 
      { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        homeTeamId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true,
          field: 'home_team_id',
          references: {
            model: 'teams',
            key: 'id',
          }
        },
        homeTeamGoals: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'home_team_goals',
        },
        awayTeamId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true,
          field: 'away_team_id',
          references: {
            model: 'teams',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        awayTeamGoals: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'away_team_goals',
        },
        inProgress: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          field: 'in_progress',
        }
      },
    );
 
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matches');

  }
};
