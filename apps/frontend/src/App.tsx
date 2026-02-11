import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import GlobalFab from "./components/GlobalFab";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingFallback from "./components/LoadingFallback";

const Home = lazy(() => import("./pages/Home"));
const RecipeDetails = lazy(() => import("./pages/RecipeDetails"));
const MyRecipes = lazy(() => import("./pages/MyRecipes"));
const Favorites = lazy(() => import("./pages/Favorites"));

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/my-recipes" element={<MyRecipes />} />
              <Route path="/favorites" element={<Favorites />} />
            </Route>
          </Routes>
        </Suspense>

        <GlobalFab />
        <ToastContainer position="bottom-right" theme="colored" />
      </div>
    </BrowserRouter>
  );
}

export default App;
