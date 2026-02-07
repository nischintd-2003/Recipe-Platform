import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const ProtectedRoute = () => {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
