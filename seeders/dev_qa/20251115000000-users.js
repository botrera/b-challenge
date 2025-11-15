'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user', [
      {
        user_id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'usuario1@example.com',
        name: 'Usuario Uno',
        balance: 100000.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: '550e8400-e29b-41d4-a716-446655440001',
        email: 'usuario2@example.com',
        name: 'Usuario Dos',
        balance: 50000.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: '550e8400-e29b-41d4-a716-446655440002',
        email: 'usuario3@example.com',
        name: 'Usuario Tres',
        balance: 25000.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: '550e8400-e29b-41d4-a716-446655440003',
        email: 'usuario4@example.com',
        name: 'Usuario Cuatro',
        balance: 75000.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: '550e8400-e29b-41d4-a716-446655440004',
        email: 'usuario5@example.com',
        name: 'Usuario Cinco',
        balance: 150000.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const { Op } = Sequelize;
    await queryInterface.bulkDelete('user', {
      user_id: {
        [Op.in]: [
          '550e8400-e29b-41d4-a716-446655440000',
          '550e8400-e29b-41d4-a716-446655440001',
          '550e8400-e29b-41d4-a716-446655440002',
          '550e8400-e29b-41d4-a716-446655440003',
          '550e8400-e29b-41d4-a716-446655440004',
        ],
      },
    });
  },
};
