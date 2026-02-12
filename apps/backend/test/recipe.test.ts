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
  // Test : Get All Recipes
  it('should retrieve a list of recipes', async () => {
    const recipeData = {
      title: 'Salad',
      ingredients: 'Lettuce, Tomato',
      steps: 'Chop and mix',
      prepTime: 5,
      userId: userId 
    };
    
    await request(app)
      .post('/api/recipe')
      .set('Authorization', `Bearer ${authToken}`)
      .send(recipeData);

    
    const response = await request(app).get('/api/recipe');

    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body[0]).toHaveProperty('title');
  });

  // Test : Update Recipe
  it('should update a recipe successfully', async () => {
    
    const createRes = await request(app)
      .post('/api/recipe')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Original Title',
        ingredients: 'Original Ingredients',
        steps: 'Original Steps',
        prepTime: 10
      });
    const recipeId = createRes.body.id;

    
    const response = await request(app)
      .patch(`/api/recipe/${recipeId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Updated Title'
      });

    
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Title');
    
    expect(response.body.ingredients).toBe('Original Ingredients');
  });

  // Test : Delete Recipe
  it('should delete a recipe', async () => {
    
    const createRes = await request(app)
      .post('/api/recipe')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ 
        title: 'Recipe To Delete', 
        ingredients: 'Ingredient 1, Ingredient 2', 
        steps: 'Step 1: Do this. Step 2: Do that.', 
        prepTime: 10 
      });
    
    const recipeId = createRes.body.id;

    if (!recipeId) {
      console.error("TEST SETUP FAILED:", createRes.body);
      throw new Error("Recipe creation failed during test setup");
    }

    const response = await request(app)
      .delete(`/api/recipe/${recipeId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(204);

    const fetchResponse = await request(app).get(`/api/recipe/${recipeId}`);
    expect(fetchResponse.status).toBe(404);
  });

  // Test : Security Check
  it('should prevent updating someone else\'s recipe', async () => {
   
    const createRes = await request(app)
      .post('/api/recipe')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ 
        title: 'User A Recipe', 
        ingredients: 'Ingredient A, Ingredient B', 
        steps: 'Step 1: Mix well. Step 2: Bake.', 
        prepTime: 10 
      });
    
    const recipeId = createRes.body.id;

    if (!recipeId) {
      throw new Error("Recipe creation failed during test setup for security check");
    }

    const userB = await createAuthenticatedUser();
    
    const response = await request(app)
      .delete(`/api/recipe/${recipeId}`)
      .set('Authorization', `Bearer ${userB.token}`);

    expect(response.status).toBe(403); 
    
    const check = await request(app).get(`/api/recipe/${recipeId}`);
    expect(check.status).toBe(200);
  });
});

