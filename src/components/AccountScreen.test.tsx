import React from "react";
import { render, screen, waitFor } from "../test-utils";
import AccountScreen, { GET_USER_QUERY } from "./AccountScreen";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

const mocks = [
  {
    request: {
      query: GET_USER_QUERY,
    },
    result: {
      data: {
        user: {
          id: "2",
          email: "test@freshcells.de",
          firstName: "FirstName",
          lastName: "LastName",
        },
      },
    },
  },
];

test("displays user information", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AuthProvider>
        <MemoryRouter>
          <I18nextProvider i18n={i18n}>
            <AccountScreen />
          </I18nextProvider>
        </MemoryRouter>
      </AuthProvider>
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/First Name: FirstName/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name: LastName/i)).toBeInTheDocument();
  });
});

test("handles loading state", () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <AuthProvider>
        <MemoryRouter>
          <AccountScreen />
        </MemoryRouter>
      </AuthProvider>
    </MockedProvider>
  );

  expect(screen.getByRole("progressbar")).toBeInTheDocument();
});

test("handles error state", async () => {
  const errorMocks = [
    {
      request: {
        query: GET_USER_QUERY,
      },
      error: new Error("An error occurred"),
    },
  ];

  render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <AuthProvider>
        <MemoryRouter>
          <AccountScreen />
        </MemoryRouter>
      </AuthProvider>
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/error fetching data/i)).toBeInTheDocument();
  });
});
