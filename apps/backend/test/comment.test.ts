import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { createAuthenticatedUser } from './helpers.js';

describe('Comment Integration Tests', () => {
  let userToken: string;
  let userId: number;
  let recipeId: number;

  beforeEach(async () => {
    // Create User
    const user = await createAuthenticatedUser();
    userToken = user.token;
    userId = user.userId;

    // Create a Recipe to comment
    const recipeRes = await request(app)
      .post('/api/recipe')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        title: 'Toast',
        ingredients: 'Bread, Butter',
        steps: 'Toast the bread. Spread butter.',
        prepTime: 2
      });
    
    recipeId = recipeRes.body.id;
  });

  // Test : Add a Comment
  it('should add a comment to a recipe', async () => {
    const response = await request(app)
      .post(`/api/recipe/${recipeId}/comment`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ content: 'Delicious toast!' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.content).toBe('Delicious toast!');
    expect(response.body.user.id).toBe(userId);
  });

  // Test : Get Comments
  it('should retrieve comments for a recipe', async () => {
    
    await request(app)
      .post(`/api/recipe/${recipeId}/comment`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ content: 'First!' });

    
    const response = await request(app).get(`/api/recipe/${recipeId}/comment`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body[0].content).toBe('First!');
  });

  // Test : Delete Own Comment
  it('should allow user to delete their own comment', async () => {
    
    const commentRes = await request(app)
      .post(`/api/recipe/${recipeId}/comment`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ content: 'To be deleted' });
    const commentId = commentRes.body.id;

    
    const response = await request(app)
      .delete(`/api/recipe/${recipeId}/comment/${commentId}`)
      .set('Authorization', `Bearer ${userToken}`);

    
    expect(response.status).toBe(204);
  });

  // Test : Security Check
  it('should prevent deleting someone else\'s comment', async () => {
    
    const commentRes = await request(app)
      .post(`/api/recipe/${recipeId}/comment`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ content: 'User A Comment' });
    const commentId = commentRes.body.id;

    const userB = await createAuthenticatedUser();

    const response = await request(app)
      .delete(`/api/recipe/${recipeId}/comment/${commentId}`)
      .set('Authorization', `Bearer ${userB.token}`);

    
    expect(response.status).toBe(403); 
  });
});