import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectIsAuthenticated } from "../features/user/userSlice";

export default function ProtectedRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}