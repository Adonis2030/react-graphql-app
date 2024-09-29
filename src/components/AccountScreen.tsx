import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import styles from "./AccountScreen.module.css";
import { useTranslation } from "react-i18next";

export const GET_USER_QUERY = gql`
  query GetUser {
    user(id: 2) {
      id
      email
      firstName
      lastName
    }
  }
`;

const AccountScreen: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery(GET_USER_QUERY);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <Container className={styles.container}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className={styles.container}>
        <Alert severity="error">{t("errorFetchingData")}</Alert>
      </Container>
    );
  }

  return (
    <Container className={styles.container}>
      <Box className={styles.box}>
        <Typography variant="h4" className={styles.title}>
          {t("accountInfo")}
        </Typography>
        <Typography variant="h6" className={styles.name}>
          {t("firstName")}: {data.user.firstName}
        </Typography>
        <Typography variant="h6" className={styles.name}>
          {t("lastName")}: {data.user.lastName}
        </Typography>
        <Button
          variant="contained"
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          {t("logout")}
        </Button>
      </Box>
    </Container>
  );
};

export default AccountScreen;
