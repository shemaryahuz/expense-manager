import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Container, TextField, Typography } from "@mui/material";

import AlertMessage from "../../components/common/AlertMessage";

import { clearMessages, selectUserState } from "../../features/user/userSlice";
import { login, signup } from "../../features/user/userThunks";

import { LOGIN_MODE, SIGNUP_MODE } from "../../constants/ui/loginConstants";
import { STATUSES } from "../../constants/features/statusConstants";

import { loginFormStyles as styles } from "./styles/LoginForm.styles";

const { LOADING } = STATUSES;

export default function LoginForm() {
  const dispatch = useDispatch();

  const [mode, setMode] = useState(LOGIN_MODE);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { actionStatus: status, actionError: error } =
    useSelector(selectUserState);

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
    mode === LOGIN_MODE ? dispatch(login(user)) : dispatch(signup(user));
  };

  const toggleMode = () => {
    dispatch(clearMessages());
    setMode((prevMode) => (prevMode === LOGIN_MODE ? SIGNUP_MODE : LOGIN_MODE));
  };

  return (
    <Container sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>
        {mode === LOGIN_MODE ? "Log in" : "Sign up"}
      </Typography>
      <Typography variant="body1" sx={styles.subTitle}>
        {mode === LOGIN_MODE ? "Log in to your account" : "Create an account"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
        {mode === SIGNUP_MODE && (
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
          disabled={status === LOADING}
          sx={styles.submitButton}
        >
          {status === LOADING
            ? "Loading..."
            : mode === LOGIN_MODE
            ? "Log in"
            : "Sign up"}
        </Button>
      </Box>
      {error && <AlertMessage severity="error" message={error} />}
      <Typography variant="body2" sx={styles.switchText}>
        {mode === LOGIN_MODE
          ? "Don't have an account? "
          : "Already have an account? "}
      </Typography>
      <Button variant="outlined" sx={styles.switchButton} onClick={toggleMode}>
        {mode === LOGIN_MODE ? "Create an account" : "Log in"}
      </Button>
    </Container>
  );
}
