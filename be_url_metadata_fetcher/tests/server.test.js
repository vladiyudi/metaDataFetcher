const request = require('supertest');
const app = require('../server');

describe('POST /fetch-metadata', () => {
  it('should return metadata for valid URLs', async () => {
    const response = await request(app)
      .post('/fetch-metadata')
      .send({ urls: ['https://www.example.com', 'https://www.google.com', 'https://www.github.com'] });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(3);
    expect(response.body[0]).toHaveProperty('title');
  });

  it('should return an error for less than 3 URLs', async () => {
    const response = await request(app)
      .post('/fetch-metadata')
      .send({ urls: ['https://www.example.com', 'https://www.google.com'] });
    expect(response.statusCode).toBe(400);
  });

  it('should handle invalid URLs', async () => {
    const response = await request(app)
      .post('/fetch-metadata')
      .send({ urls: ['https://www.example.com', 'invalid-url', 'https://www.github.com'] });
    expect(response.statusCode).toBe(200);
    expect(response.body[1]).toHaveProperty('error');
  });
});
