import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { selectUserState } from "../features/user/userSlice";
import { STATUSES } from "../constants/features/statusConstants";

import Loader from "../components/common/Loader";

const { IDLE, LOADING } = STATUSES;

export default function PublicRoute() {
  const { status } = useSelector(selectUserState);

  const loading = status === LOADING || status === IDLE;
  return loading ? <Loader /> : <Outlet />;
}
