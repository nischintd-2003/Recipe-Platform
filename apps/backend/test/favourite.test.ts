import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { createAuthenticatedUser } from './helpers.js';

describe('Favourite Integration Tests', () => {
  let userToken: string;
  let userId: number;
  let recipeId: number;

  // Create a User and a Recipe
  beforeEach(async () => {
    const user = await createAuthenticatedUser();
    userToken = user.token;
    userId = user.userId;

    const recipeRes = await request(app)
      .post('/api/recipe')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        title: 'My Favorite Dish',
        ingredients: 'Chowmin, Roll, and more sauce',
        steps: 'Step 1: Mix them well. Step 2: Serve.',
        prepTime: 100
      });
    
    recipeId = recipeRes.body.id;
  });

  // Test : Add to Favourites
  it('should add a recipe to favourites', async () => {
    const response = await request(app)
      .post(`/api/recipe/${recipeId}/favourite`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.recipe.id).toBe(recipeId);
    expect(response.body.user.id).toBe(userId);
  });

  // Test : Get User Favourites
  it('should retrieve a list of user favourites', async () => {
    
    await request(app)
      .post(`/api/recipe/${recipeId}/favourite`)
      .set('Authorization', `Bearer ${userToken}`);

    
    const response = await request(app)
      .get('/api/favourites')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0].recipe.title).toBe('My Favorite Dish');
  });

  // Test : Remove from Favourites
  it('should remove a recipe from favourites', async () => {
   
    await request(app)
      .post(`/api/recipe/${recipeId}/favourite`)
      .set('Authorization', `Bearer ${userToken}`);

    
    const response = await request(app)
      .delete(`/api/recipe/${recipeId}/favourite`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(204);

    const listRes = await request(app)
      .get('/api/favourites')
      .set('Authorization', `Bearer ${userToken}`);
    
    expect(listRes.body.length).toBe(0);
  });

  // Test : Check "isFavourite" flag in Recipe Details
  it('should set isFavourite=true when fetching recipe details', async () => {

    await request(app)
      .post(`/api/recipe/${recipeId}/favourite`)
      .set('Authorization', `Bearer ${userToken}`);

    const response = await request(app)
      .get(`/api/recipe/${recipeId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.isFavourite).toBe(true);
  });
});