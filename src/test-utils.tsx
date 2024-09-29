import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { AuthProvider } from "./context/AuthContext";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";

function render(ui: React.ReactElement, { ...renderOptions } = {}) {
  return rtlRender(
    <ApolloProvider client={client}>
      <AuthProvider>{ui}</AuthProvider>
    </ApolloProvider>,
    renderOptions
  );
}

export * from "@testing-library/react";
export { render };
