const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('NGO', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to creat a new NGO', async () => {
    const response = await request(app).post('/ngos').send({
      name: 'Silva NGO 1',
      email: 'silvango@silvango.com',
      whatsapp: '3333333333',
      city: 'Tornto',
      state: 'ON',
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
