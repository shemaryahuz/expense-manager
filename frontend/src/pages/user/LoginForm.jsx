import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Container, TextField, Typography } from "@mui/material";

import AlertMessage from "../../components/common/AlertMessage";

import { clearMessages, selectUserState } from "../../features/user/userSlice";
import { login, signup } from "../../features/user/userThunks";

import { loginFormStyles as styles } from "./styles/LoginForm.styles";

export default function LoginForm() {
  const dispatch = useDispatch();

  const { loading, error } = useSelector(selectUserState);

  const [mode, setMode] = useState("login");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const handleChange = (event) => {
    dispatch(clearMessages());

    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mode === "login" ? dispatch(login(user)) : dispatch(signup(user));
  };

  const toggleMode = () => {
    dispatch(clearMessages());
    setMode((prevMode) => (prevMode === "login" ? "signup" : "login"));
  };

  return (
    <Container sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>
        {mode === "login" ? "Log in" : "Sign up"}
      </Typography>
      <Typography variant="body1" sx={styles.subTitle}>
        {mode === "login" ? "Log in to your account" : "Create an account"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
        {mode === "signup" && (
          <TextField
            label="Name"
            name="name"
            value={name}
            required
            autoComplete="name"
            onChange={handleChange}
            sx={styles.input}
          />
        )}
        <TextField
          type="email"
          label="Email"
          name="email"
          value={email}
          required
          autoComplete="email"
          onChange={handleChange}
          sx={styles.input}
        />
        <TextField
          type="password"
          label="Password"
          name="password"
          value={password}
          required
          autoComplete="current-password"
          onChange={handleChange}
          sx={styles.input}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          sx={styles.submitButton}
        >
          {loading ? "Loading..." : mode === "login" ? "Log in" : "Sign up"}
        </Button>
      </Box>
      {error && <AlertMessage severity="error" message={error} />}
      <Typography variant="body2" sx={styles.switchText}>
        {mode === "login"
          ? "Don't have an account? "
          : "Already have an account? "}
      </Typography>
      <Button variant="outlined" sx={styles.switchButton} onClick={toggleMode}>
        {mode === "login" ? "Create an account" : "Log in"}
      </Button>
    </Container>
  );
}
