const request = require('supertest');
const app = require('../server');

describe('API Documentation', () => {
  it('should serve the Swagger UI documentation', async () => {
    const response = await request(app).get('/api-docs/');
    // swagger-ui-express serves the index.html which should be a 200
    expect(response.statusCode).toBe(200);
    // Check for a known piece of text from the Swagger UI page
    expect(response.text).toContain('<title>Swagger UI</title>');
  });
});
