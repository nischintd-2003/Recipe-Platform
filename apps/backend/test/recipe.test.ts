import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { createAuthenticatedUser } from './helpers.js';

describe('Recipe Integration Tests', () => {
  let authToken: string;
  let userId: number;

  beforeEach(async () => {
    const user = await createAuthenticatedUser();
    authToken = user.token;
    userId = user.userId;
  });

  // Create a valid recipe
  it('should create a new recipe successfully', async () => {
    
    const newRecipe = {
      title: 'Spicy Pasta',
      ingredients: 'Pasta, Chili, Tomato Sauce, Garlic',
      steps: 'Boil pasta. Fry garlic. Mix everything.',
      prepTime: 30,
      image: 'http://example.com/pasta.jpg'
    };

    
    const response = await request(app)
      .post('/api/recipe')
      .set('Authorization', `Bearer ${authToken}`) 
      .send(newRecipe);

    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newRecipe.title);
    expect(response.body.ingredients).toBe(newRecipe.ingredients);
    expect(response.body.user.id).toBe(userId); 
  });

  // Test : Validation Failure (Missing Title)
  it('should fail to create recipe without a title', async () => {
    
    const invalidRecipe = {
      ingredients: 'Just ingredients, no title',
      steps: 'Mix it.',
      prepTime: 10
    };

    
    const response = await request(app)
      .post('/api/recipe')
      .set('Authorization', `Bearer ${authToken}`)
      .send(invalidRecipe);

    
    expect(response.status).toBe(400);
  });
  
  // Test : Unauthorized Access
  it('should fail if user is not logged in', async () => {
     
     const recipe = {
        title: 'Secret Sauce',
        ingredients: 'Secret',
        steps: 'Mix', 
        prepTime: 5
     };

     
     const response = await request(app)
        .post('/api/recipe')
        .send(recipe);

     
     expect(response.status).toBe(401);
  });
});

