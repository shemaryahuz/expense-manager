import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Container } from "@mui/material";

import { selectUserState, clearMessages } from "../../features/user/userSlice";

import { USER } from "../../constants/ui/user";
import { ROUTE_PATHS } from "../../constants/app/routes";

import PublicHome from "./PublicHome";
import PrivateHome from "./PrivateHome";

const { DASHBOARD } = ROUTE_PATHS;

export default function HomePage() {
  const dispatch = useDispatch();

  const { user, success, isAuthenticated } = useSelector(selectUserState);
  const [showSuccess, setShowSuccess] = useState(false);

  const name = user?.name || USER;
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate(DASHBOARD);
      }, 3000);
    }
  }, [success]);

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
          success={success}
          onClose={handleClose}
          onNavigate={handleNavigate}
        />
      ) : (
        <PublicHome />
      )}
    </Container>
  );
}
