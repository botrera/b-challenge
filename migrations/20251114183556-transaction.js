'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transaction', {
      transaction_id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      origin: {
        type: Sequelize.UUID,
        references: {
          model: 'user',
          key: 'user_id',
        },
        allowNull: false,
      },
      destination: {
        type: Sequelize.UUID,
        references: {
          model: 'user',
          key: 'user_id',
        },
        allowNull: false,
      },
      amount: {
        type: Sequelize.FLOAT,
        required: true,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['PENDING', 'CONFIRMED', 'REJECTED'],
        defaultValue: 'PENDING',
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transaction');
  },
};
