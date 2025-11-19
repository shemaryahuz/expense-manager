import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Box, Button, Container, Fade, Typography } from "@mui/material";
import { CallMade } from "@mui/icons-material";

import { selectUserState } from "../../features/user/userSlice";

import LoginForm from "../user/LoginForm";
import Success from "../../components/common/Success";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const { user, success, isAuthenticated } = useSelector(selectUserState);
  const name = user?.name;

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/dashboard");
  };


  return (
    <Container sx={{ mt: 4 }}>
      {isAuthenticated ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {showSuccess && (
            <Fade in={showSuccess} timeout={500} unmountOnExit>
              <Box>
                <Success message={success} />
              </Box>
            </Fade>
          )}
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
          >
            Welcome, {name ? name : "Guest"}!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleNavigate}
            sx={{
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            Go to Dashboard <CallMade sx={{ fontSize: "small" }} />
          </Button>
        </Box>
      ) : (
        <Box>
          <LoginForm />
        </Box>
      )}
    </Container>
  );
}
