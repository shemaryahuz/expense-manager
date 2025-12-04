import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectUser } from "../features/user/userSlice";

export default function ProtectedRoute() {
  const user = useSelector(selectUser);

  return user ? <Outlet /> : <Navigate to="/" replace />;
}
