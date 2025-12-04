import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Container } from "@mui/material";

import { selectUserState, clearMessages } from "../../features/user/userSlice";

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

  const [showSuccess, setShowSuccess] = useState(false);

  const {
    user,
    isAuthenticated,
    actionStatus: status,
    successMessage,
  } = useSelector(selectUserState);

  const name = user?.name || USER;

  useEffect(() => {
    if (status === SUCCEEDED && isAuthenticated && successMessage) {
      setShowSuccess(true);

      setTimeout(() => {
        navigate(DASHBOARD);
        dispatch(clearMessages());
      }, 3000);
    }
  }, [status, isAuthenticated, successMessage, navigate]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setShowSuccess(false);
    dispatch(clearMessages());
  };

  const handleNavigate = () => {
    navigate(DASHBOARD);
  };

  return (
    <Container sx={{ mt: 4 }}>
      {isAuthenticated ? (
        <PrivateHome
          name={name}
          showSuccess={showSuccess}
          successMessage={successMessage}
          onClose={handleClose}
          onNavigate={handleNavigate}
        />
      ) : (
        <PublicHome />
      )}
    </Container>
  );
}
