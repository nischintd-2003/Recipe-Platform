import request from 'supertest';
import app from '../src/app.js'; 

export async function createAuthenticatedUser() {
  const userData = {
    username: 'testchef_' + Date.now(),
    email: `chef_${Date.now()}@example.com`,
    password: 'password123'
  };

  // Signup a new user
  await request(app)
    .post('/api/auth/signup')
    .send(userData);
  
  // Login a user
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({
      email: userData.email,
      password: userData.password
    });

  const token = loginRes.body.token;
  const userId = loginRes.body.user.id;

  return { token, userId, userData };
}