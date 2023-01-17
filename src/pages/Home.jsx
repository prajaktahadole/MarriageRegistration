import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const Home = () => {
  const url2 = "https://marriage-data.vercel.app/users";
  const { t } = useTranslation();
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (name !== "" && email !== "" && password !== "") {
      fetch(url2, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          alert("Signup successfull");
          setUser(initialState);
          return navigate("/");
        })
        .catch(() => alert("Signup failed"));
    } else {
      alert("Please fill the details");
    }
  };

  const { name, email, password } = user;

  return (
    <Box
      width="60%"
      m="auto"
      p="15px"
      mt="15px"
      borderRadius="5px"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
      rounded="md"
      bg="white"
    >
      <FormControl isRequired>
        <FormLabel>{t("Name")}</FormLabel>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
        <FormLabel>{t("Email")}</FormLabel>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />

        <FormLabel>{t("Password")}</FormLabel>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <Button mt={6} colorScheme="teal" type="Signup" onClick={handleSignup}>
          {t("Signup")}
        </Button>
        <br />
        <br />

        <Link to="/">{t("Already have an account")}</Link>
      </FormControl>
    </Box>
  );
};

export default Home;
