import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { selectUserState } from "../features/user/userSlice";
import { STATUSES } from "../constants/features/statusConstants";
import { ROUTE_PATHS } from "../constants/app/routes";

import Loader from "../components/common/Loader";

const { IDLE, LOADING } = STATUSES;
const { HOME } = ROUTE_PATHS;

export default function ProtectedRoute() {
  const location = useLocation();

  const { user, status } = useSelector(selectUserState);

  const loading = status === LOADING || status === IDLE;

  return (
    <>
      {loading && <Loader />}
      {!loading && user && <Outlet />}
      {!loading && !user && (
        <Navigate to={HOME} state={{ from: location }} replace />
      )}
    </>
  );
}
