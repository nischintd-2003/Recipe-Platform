import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import GlobalFab from "./components/GlobalFab";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingFallback from "./components/LoadingFallback";
import { ROUTES } from "./config/constants";

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
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.RECIPES} element={<Home />} />
            <Route path={ROUTES.RECIPE_DETAILS} element={<RecipeDetails />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path={ROUTES.MY_RECIPES} element={<MyRecipes />} />
              <Route path={ROUTES.FAVORITES} element={<Favorites />} />
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
