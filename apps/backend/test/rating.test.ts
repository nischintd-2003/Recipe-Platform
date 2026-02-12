import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { createAuthenticatedUser } from './helpers.js';

describe('Rating Integration Tests', () => {
  let userToken: string;
  let recipeId: number;

  // Create a User and a Recipe
  beforeEach(async () => {
    const user = await createAuthenticatedUser();
    userToken = user.token;

    const recipeRes = await request(app)
      .post('/api/recipe')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        title: 'Rate Me',
        ingredients: 'Ingredient A, Ingredient B',
        steps: 'Step 1: Do this. Step 2: Do that.',
        prepTime: 10
      });
    
    recipeId = recipeRes.body.id;
  });

  // Test : Rate a Recipe
  it('should allow a user to rate a recipe', async () => {
    const response = await request(app)
      .post(`/api/recipe/${recipeId}/rate`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ value: 5 });

    expect(response.status).toBe(201);
    expect(response.body.value).toBe(5);
  });

  // Test : Prevent Duplicate Ratings
  it('should prevent a user from rating the same recipe twice', async () => {
    
    await request(app)
      .post(`/api/recipe/${recipeId}/rate`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ value: 4 });

    
    const response = await request(app)
      .post(`/api/recipe/${recipeId}/rate`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ value: 3 });

    
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/already rated/i);
  });

  // Test : Validation 
  it('should reject invalid rating values', async () => {

    const resZero = await request(app)
      .post(`/api/recipe/${recipeId}/rate`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ value: 0 });
    expect(resZero.status).toBe(400);


    const resSix = await request(app)
      .post(`/api/recipe/${recipeId}/rate`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ value: 6 });
    expect(resSix.status).toBe(400);
  });

  // Test : Average Calculation
  it('should calculate average rating correctly', async () => {
    
    await request(app)
      .post(`/api/recipe/${recipeId}/rate`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ value: 5 });

    
    const userB = await createAuthenticatedUser();
    await request(app)
      .post(`/api/recipe/${recipeId}/rate`)
      .set('Authorization', `Bearer ${userB.token}`)
      .send({ value: 3 });

    const response = await request(app).get(`/api/recipe/${recipeId}`);

    expect(response.status).toBe(200);
    expect(Number(response.body.averageRating)).toBe(4);
    expect(Number(response.body.ratingCount)).toBe(2);
  });
});