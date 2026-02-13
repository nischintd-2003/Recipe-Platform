import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from './utils'; 
import RecipeCard from '../src/components/RecipeCard';
import { Recipe } from '../src/interfaces/recipe.interface';
 
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
 
const mockRecipe: Recipe = {
  id: 1,
  title: 'Test Pasta',
  ingredients: 'Pasta, Sauce, spices',
  steps: 'Boil, Mix , stir it well',
  imageUrl: 'http://test.com/img.jpg',
  prepTime: 20,
  averageRating: 4.5,
  ratingCount: 10,
  createdAt: new Date().toISOString(),
  user: { id: 1, email: 'chef@test.com' },
  isFavourite: false,
};
 
describe('RecipeCard Component', () => {
  
    it('renders recipe details correctly', () => {
    
    render(<RecipeCard recipe={mockRecipe} />);
 
    expect(screen.getByText('Test Pasta')).toBeInTheDocument();
    expect(screen.getByText('20m')).toBeInTheDocument();
    expect(screen.getByText('(10)')).toBeInTheDocument();
  });
 
  it('renders placeholder image if imageUrl is missing', () => {
    const recipeNoImg = { ...mockRecipe, imageUrl: null };
    render(<RecipeCard recipe={recipeNoImg} />);
 
    const img = screen.getByAltText('Test Pasta');
    expect(img).toHaveAttribute('src', '/image-placeholder.webp');
  });
 
  it('navigates to details page on click', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    
    const cardAction = screen.getByRole('button'); 
    fireEvent.click(cardAction);
 
    expect(mockNavigate).toHaveBeenCalledWith('/recipe/1');
  });
});