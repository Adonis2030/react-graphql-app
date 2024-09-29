import React from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup } from "@mui/material";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ButtonGroup variant="text">
      <Button onClick={() => changeLanguage("en")}>EN</Button>
      <Button onClick={() => changeLanguage("ge")}>GE</Button>
    </ButtonGroup>
  );
};

export default LanguageSwitcher;
