const request = require('supertest');
const app = require('../server');
const { User } = require('../model'); // Import the User model

// Mock the authentication middleware
jest.mock('../model/auth/authenticate', () => {
  return jest.fn((req, res, next) => next());
});

// Mock the User model's findAll method
jest.spyOn(User, 'findAll').mockResolvedValue([
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
]);

describe('User API', () => {
  // Test for GET all users
  it('should get all users', async () => {
    const response = await request(app).get('/user');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe('John Doe');
  });
});
