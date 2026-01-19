import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Container } from "@mui/material";

import {
  selectUserState,
  selectUserName,
  clearMessage,
} from "../../features/user/userSlice";

import { STATUSES } from "../../constants/features/statusConstants";
import { USER } from "../../constants/ui/userConstants";
import { ROUTE_PATHS } from "../../constants/app/routes";

import PublicHome from "./PublicHome";
import PrivateHome from "./PrivateHome";

const { SUCCEEDED } = STATUSES;
const { DASHBOARD } = ROUTE_PATHS;

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(false);

  const { user, status, message } = useSelector(selectUserState);

  const name = useSelector(selectUserName) || USER;

  useEffect(() => {
    if (status === SUCCEEDED && user && message) {
      setShowMessage(true);

      setTimeout(() => {
        navigate(DASHBOARD);
        dispatch(clearMessage());
      }, 3000);
    }
  }, [status, user, message, dispatch, navigate]);

  const handleClose = (_, reason) => {
    if (reason !== "clickaway") {
      setShowMessage(false);
      dispatch(clearMessage());
    }
  };

  const handleNavigate = () => navigate(DASHBOARD);

  return (
    <Container>
      {user ? (
        <PrivateHome
          name={name}
          showSuccess={showMessage}
          successMessage={message}
          onClose={handleClose}
          onNavigate={handleNavigate}
        />
      ) : (
        <PublicHome />
      )}
    </Container>
  );
}
