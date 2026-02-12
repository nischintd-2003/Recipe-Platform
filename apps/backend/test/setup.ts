import { AppDataSource } from '../src/config/datasource.js';
import { beforeAll, afterAll, beforeEach } from 'vitest';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

beforeAll(async () => {
  if (process.env.DB_NAME !== 'recipe_test') {
    throw new Error(`TEST SETUP FAILED: DB_NAME is ${process.env.DB_NAME}. It must be 'recipe_test'.`);
  }

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});

beforeEach(async () => {
  if (AppDataSource.isInitialized) {
    const entities = AppDataSource.entityMetadatas;
    for (const entity of entities) {
      const repository = AppDataSource.getRepository(entity.name);
      await repository.query('SET FOREIGN_KEY_CHECKS = 0;');
      await repository.query(`TRUNCATE TABLE \`${entity.tableName}\`;`);
      await repository.query('SET FOREIGN_KEY_CHECKS = 1;');
    }
  }
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});