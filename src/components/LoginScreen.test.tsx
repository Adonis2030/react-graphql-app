// src/components/LoginScreen.test.tsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import LoginScreen, { LOGIN_MUTATION } from "./LoginScreen";
import { MemoryRouter } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Mock the useAuth hook
jest.mock("../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  // Keep other exports from react-router-dom
}));

// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("LoginScreen Component", () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
  });

  test("renders the login form", () => {
    render(
      <MockedProvider>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByLabelText("email")).toBeInTheDocument();
    expect(screen.getByLabelText("password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "login" })).toBeInTheDocument();
  });

  test("shows validation errors when fields are empty", async () => {
    render(
      <MockedProvider>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "login" }));

    expect(await screen.findByText("emailRequired")).toBeInTheDocument();
    expect(await screen.findByText("passwordRequired")).toBeInTheDocument();
  });

  test("shows validation error for invalid email", async () => {
    render(
      <MockedProvider>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText("email"), {
      target: { value: "testemail" },
    });
    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: "KTKwXm2grV4wHzW" },
    });

    fireEvent.click(screen.getByRole("button", { name: "login" }));

    expect(await screen.findByText("invalidEmail")).toBeInTheDocument();
  });

  test("submits form and logs in successfully", async () => {
    const mocks = [
      {
        request: {
          query: LOGIN_MUTATION,
          variables: {
            email: "test@freshcells.de",
            password: "KTKwXm2grV4wHzW",
          },
        },
        result: {
          data: {
            login: {
              jwt: "fake-jwt-token",
            },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText("email"), {
      target: { value: "test@freshcells.de" },
    });
    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: "KTKwXm2grV4wHzW" },
    });

    fireEvent.click(screen.getByRole("button", { name: "login" }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("fake-jwt-token");
      expect(mockNavigate).toHaveBeenCalledWith("/account");
    });
  });

  test("displays server error when login fails", async () => {
    const mocks = [
      {
        request: {
          query: LOGIN_MUTATION,
          variables: {
            email: "test@freshcell.de",
            password: "KTKwXm2grV4wHW",
          },
        },
        error: new Error("Incorrect email or password"),
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText("email"), {
      target: { value: "test@freshcell.de" },
    });
    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: "KTKwXm2grV4wHW" },
    });

    fireEvent.click(screen.getByRole("button", { name: "login" }));

    expect(await screen.findByText("incorrectCredentials")).toBeInTheDocument();
  });
});
