import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { selectUserState } from "../features/user/userSlice";
import { STATUSES } from "../constants/features/statusConstants";

import Loader from "../components/common/Loader";

const { IDLE, LOADING } = STATUSES;

export default function PublicRoute() {
  const { authStatus } = useSelector(selectUserState);

  const loading = authStatus === LOADING || authStatus === IDLE;
  return loading ? <Loader /> : <Outlet />;
}
