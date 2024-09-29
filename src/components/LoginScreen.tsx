import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import BackgroundIMG from "../assets/background.png";
import styles from "./LoginScreen.module.css";
import { useTranslation } from "react-i18next";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
      jwt
    }
  }
`;

const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { loading }] = useMutation(LOGIN_MUTATION);
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError("");
    }
    if (serverError) {
      setServerError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) {
      setPasswordError("");
    }
    if (serverError) {
      setServerError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setServerError("");

    let emailErrorMsg = "";
    let passwordErrorMsg = "";

    if (!email) {
      emailErrorMsg = "emailRequired";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailErrorMsg = "invalidEmail";
    }

    if (!password) {
      passwordErrorMsg = "passwordRequired";
    }

    setEmailError(emailErrorMsg);
    setPasswordError(passwordErrorMsg);

    if (emailErrorMsg || passwordErrorMsg) return;

    try {
      const { data } = await login({
        variables: { email, password },
      });
      if (data?.login?.jwt) {
        loginUser(data.login.jwt);
        navigate("/account");
      }
    } catch (err: any) {
      setServerError("incorrectCredentials");
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Container
      className={styles.container}
      style={{ backgroundImage: `url(${BackgroundIMG})` }}
    >
      <Box className={styles.box}>
        <Typography variant="h4" className={styles.title}>
          {t("login")}
        </Typography>
        <form onSubmit={handleSubmit} className={styles.form}>
          <FormControl
            className={styles.formControl}
            variant="outlined"
            error={Boolean(emailError)}
          >
            <InputLabel htmlFor="outlined-adornment-email">
              {t("email")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              label="Email"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="email icon" edge="end">
                    <AccountCircle />
                  </IconButton>
                </InputAdornment>
              }
            />
            {emailError && (
              <Typography variant="caption" color="error">
                {t(emailError)}
              </Typography>
            )}
          </FormControl>

          <FormControl
            className={styles.formControl}
            variant="outlined"
            error={Boolean(passwordError)}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              {t("password")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              label={t("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? t("hidePassword", "Hide password")
                        : t("showPassword", "Show password")
                    }
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {passwordError && (
              <Typography variant="caption" color="error">
                {t(passwordError)}
              </Typography>
            )}
          </FormControl>

          <Box className={styles.checkboxContainer}>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label={<Typography>{t("rememberMe")}</Typography>}
            />
            <Link href="#" underline="none" className={styles.link}>
              {t("forgotPassword")}
            </Link>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            startIcon={
              loading && <CircularProgress size={20} color="inherit" />
            }
          >
            {t("login")}
          </Button>
          {serverError && (
            <Typography color="error" className={styles.errorText}>
              {t(serverError)}
            </Typography>
          )}
        </form>
        <Typography className={styles.registerText}>
          {t("dontHaveAccount")}{" "}
          <Link href="#" underline="none">
            {t("register")}
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginScreen;
