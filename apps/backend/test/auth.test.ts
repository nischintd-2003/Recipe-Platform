import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Auth Integration Tests', () => {
  
  // Test Case : Successful Signup
  it('should register a new user successfully', async () => {
    
    const newUser = {
      username: 'testchef',
      email: 'chef@example.com',
      password: 'securepassword123'
    };

    
    const response = await request(app)
      .post('/api/auth/signup')
      .send(newUser);

   
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email', newUser.email);
    expect(response.body).not.toHaveProperty('password');
  });

  // Test Case : Duplicate Email
  it('should fail when registering with an existing email', async () => {
    
    const user = {
      username: 'duplicate',
      email: 'duplicate@example.com',
      password: 'password123'
    };
    await request(app).post('/api/auth/signup').send(user);

    
    const response = await request(app)
      .post('/api/auth/signup')
      .send(user);

   
    expect(response.status).toBe(409); 
    expect(response.body).toHaveProperty('message'); 
  });
});