import request from 'supertest';
import app from'../server.js';

describe('Ana sayfaya yönlendirme testi', () => {

  test('Ana sayfaya yönlendirme kontrolü', async () => {
    const response = await request(app).get('/farkli');
    expect(response.status).toBe(404); 
   
  });

  describe('Auth Controller Testi', () => {

    test('user Controller', async () => {
      const userData = { email: 'ayse@gmail.com', password: '2233ayse' };
  
      const response = await request(app)
        .post('/user-auth')
        .send(userData);
  
      expect(response.status).toBe(404); });

  
    test('Compaines Controller', async () => {
      const userData = { email: 'example_user', password: 'wrong_password' };
  
      const response = await request(app)
        .post('/user-auth')
        .send(userData);
  
      expect(response.status).toBe(404); });
  });

});

test('Job Controller', async () => {
  const userData = { email: 'example_user', password: 'wrong_password' };

  const response = await request(app)
    .post('/user-auth')
    .send(userData);

  expect(response.status).toBe(404);
 });
