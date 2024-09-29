// import React from "react";
// import { render, screen, fireEvent } from "../test-utils";
// import LanguageSwitcher from "./LanguageSwitcher";
// import { useTranslation } from "react-i18next";

// test("renders language switcher", () => {
//   render(<LanguageSwitcher />);
//   expect(screen.getByText(/en/i)).toBeInTheDocument();
//   expect(screen.getByText(/ge/i)).toBeInTheDocument();
// });

// test("switches language", () => {
//   render(<LanguageSwitcher />);

//   const { i18n } = useTranslation();

//   fireEvent.click(screen.getByText(/ge/i));
//   expect(i18n.language).toBe("ge");

//   fireEvent.click(screen.getByText(/en/i));
//   expect(i18n.language).toBe("en");
// });

import React from "react";
import { render, screen, fireEvent } from "../test-utils";
import LanguageSwitcher from "./LanguageSwitcher";
import i18n from "../i18n"; // Import your i18n configuration

test("renders language switcher", () => {
  render(<LanguageSwitcher />);
  expect(screen.getByText(/en/i)).toBeInTheDocument();
  expect(screen.getByText(/ge/i)).toBeInTheDocument(); // Corrected language code
});

test("switches language", () => {
  render(<LanguageSwitcher />);

  // Initially, the language might be 'en' by default
  expect(i18n.language).toBe("en");

  fireEvent.click(screen.getByText(/ge/i));
  expect(i18n.language).toBe("ge");

  fireEvent.click(screen.getByText(/en/i));
  expect(i18n.language).toBe("en");
});
