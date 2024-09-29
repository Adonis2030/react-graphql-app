import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";
import { AuthProvider } from "./context/AuthContext";
import LoginScreen from "./components/LoginScreen";
import AccountScreen from "./components/AccountScreen";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import LanguageSwitcher from "./components/LanguageSwitcher";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <div style={{ position: "absolute", top: 10, left: 10 }}>
            <LanguageSwitcher />
          </div>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginScreen />
                </PublicRoute>
              }
            />
            <Route
              path="/account"
              element={
                <PrivateRoute>
                  <AccountScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="*"
              element={
                <Navigate
                  to={localStorage.getItem("token") ? "/account" : "/login"}
                  replace
                />
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
