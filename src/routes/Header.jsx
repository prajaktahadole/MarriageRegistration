import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const Header = () => {
  const { t } = useTranslation();
  const { toggleAuth, isAdmin, isUser, toggleUser } = useContext(AuthContext);
  const [language, setLanguage] = useState("English");
  const handleclick = () => {
    if (isAdmin) {
      toggleAuth();
    } else if (isUser) {
      sessionStorage.clear();
      toggleUser();
    }
  };

  const handleLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <Flex
        bg="teal"
        gap="70px"
        p="20px"
        alignItems="center"
      >
        
        <Link to="/">
          {isAdmin ? "Admin" : JSON.parse(sessionStorage.getItem("user")) || ""}
        </Link>
        <Link to="/dashboard">{t("Dashboard")}</Link>
        <Link to="/register">{t("Registration")}</Link>
        {isAdmin || isUser ? (
          <Link to="/" onClick={handleclick}>
            {t("Logout")}
          </Link>
        ) : (
          ""
        )}
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="none">
            {language}
          </MenuButton>
          <MenuList>
            <MenuItem
              value={"en"}
              onClick={(e) => {
                setLanguage("English");
                handleLanguage(e);
              }}
            >
              English
            </MenuItem>
            <MenuItem
              value={"hi"}
              onClick={(e) => {
                setLanguage("हिंदी");
                handleLanguage(e);
              }}
            >
              हिंदी
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
};

export default Header;
