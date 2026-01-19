import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Dialog, TextField, Typography } from "@mui/material";

import AlertMessage from "../../components/common/AlertMessage";

import { clearMessage, selectUserState } from "../../features/user/userSlice";
import { login, signup } from "../../features/user/userThunks";

import { useTranslation } from "../../hooks/i18n";

import { LOGIN_MODE, SIGNUP_MODE } from "../../constants/ui/loginConstants";
import { STATUSES } from "../../constants/features/statusConstants";

import { loginFormStyles as styles } from "./styles/LoginForm.styles";

const { LOADING, FAILED, SUCCEEDED } = STATUSES;

export default function LoginForm({ open, onClose }) {
  const dispatch = useDispatch();

  const { translate } = useTranslation();

  const [mode, setMode] = useState(LOGIN_MODE);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { status, message } = useSelector(selectUserState);

  const { name, email, password } = user;

  useEffect(() => {
    if (status === SUCCEEDED && message) {
      onClose();
    }
  }, [status, message, onClose]);

  const handleChange = ({ target: { name, value } }) => {
    dispatch(clearMessage());

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
    dispatch(clearMessage());
    setMode((prevMode) => (prevMode === LOGIN_MODE ? SIGNUP_MODE : LOGIN_MODE));
  };

  return (
    <Dialog open={open} onClose={onClose} sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>
        {mode === LOGIN_MODE ? translate("Log in") : translate("Sign up")}
      </Typography>
      <Typography variant="body1" sx={styles.subTitle}>
        {mode === LOGIN_MODE
          ? translate("Log in to your account")
          : translate("Create an account")}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
        {mode === SIGNUP_MODE && (
          <TextField
            label={translate("Name")}
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
          label={translate("Email")}
          name="email"
          value={email}
          required
          autoComplete="email"
          onChange={handleChange}
          sx={styles.input}
        />
        <TextField
          type="password"
          label={translate("Password")}
          name="password"
          value={password}
          required
          slotProps={{ htmlInput: { minLength: 4 } }}
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
            ? translate("Loading...")
            : mode === LOGIN_MODE
            ? translate("Log in")
            : translate("Sign up")}
        </Button>
      </Box>
      {status === FAILED && message && (
        <AlertMessage severity="error" message={message} />
      )}
      <Typography variant="body2" sx={styles.switchText}>
        {mode === LOGIN_MODE
          ? translate("Don't have an account?")
          : translate("Already have an account?")}
      </Typography>
      <Button variant="outlined" sx={styles.switchButton} onClick={toggleMode}>
        {mode === LOGIN_MODE ? translate("Sign up") : translate("Log in")}
      </Button>
    </Dialog>
  );
}
