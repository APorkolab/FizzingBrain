const request = require('supertest');
const app = require('../server');
const { Question } = require('../model');

// Mock the database methods used by the findRandom service
jest.spyOn(Question, 'count').mockResolvedValue(1); // Simulate that there is at least one question
jest.spyOn(Question, 'findOne').mockResolvedValue({
  id: 100,
  question: 'What is the answer to life, the universe, and everything?',
  answer: 42,
});

describe('Question API', () => {
  // Test for GET random question
  it('should get a random question', async () => {
    const response = await request(app).get('/question/rand');
    expect(response.statusCode).toBe(200);
    // The findRandom method returns an array of questions
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].question).toBe('What is the answer to life, the universe, and everything?');
  });
});
