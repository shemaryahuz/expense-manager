import { useSelector } from "react-redux";

import { Navigate, Outlet } from "react-router-dom";

import { selectUserState } from "../features/user/userSlice";

export default function ProtectedRoute() {
  const { isAuthenticated } = useSelector(selectUserState);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}