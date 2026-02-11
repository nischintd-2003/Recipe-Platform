import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { ROUTES } from "../config/constants";

const ProtectedRoute = () => {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
