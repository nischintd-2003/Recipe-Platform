import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import GlobalFab from "./components/GlobalFab";

const MyRecipes = () => <h1>My Recipes</h1>;
const Favorites = () => <h1>Favorites</h1>;

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          {/* Protected Routes */}
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <GlobalFab />
      </div>
    </BrowserRouter>
  );
}

export default App;
