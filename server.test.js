const request = require('supertest');
const app = require('./server');

describe('Dog API', () => {
  describe('GET /dogs', () => {
    it('should return all dogs', async () => {
      const response = await request(app).get('/dogs');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /dogs/:id', () => {
    it('should return a specific dog by id', async () => {
      const response = await request(app).get('/dogs/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('breed');
      expect(response.body).toHaveProperty('age');
    });

    it('should return 404 for non-existent dog', async () => {
      const response = await request(app).get('/dogs/9999');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Dog not found');
    });
  });

  describe('POST /dogs', () => {
    it('should create a new dog', async () => {
      const newDog = {
        name: 'Luna',
        breed: 'Husky',
        age: 4
      };
      
      const response = await request(app)
        .post('/dogs')
        .send(newDog)
        .set('Content-Type', 'application/json');
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Luna');
      expect(response.body.breed).toBe('Husky');
      expect(response.body.age).toBe(4);
    });

    it('should return 400 if required fields are missing', async () => {
      const invalidDog = {
        name: 'Incomplete'
      };
      
      const response = await request(app)
        .post('/dogs')
        .send(invalidDog)
        .set('Content-Type', 'application/json');
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
