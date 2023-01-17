import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  VStack,
  Input,
  Select,
  Text,
  Box,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const initialState = {
  Groom_Name: "",
  Groom_DOB : "",
  Groom_MobileNumber: "",
  Groom_religion: "",
  Groom_age: "",
  Groom_Occupation : "",
  Groom_MaritalStatus: "",
  Bride_Name: "",
  Bride_DOB : "",
  Bride_MobileNumber: "",
  Bride_religion: "",
  Bride_age: "",
  Bride_Occupation : "",
  Bride_MaritalStatus : "",
  accept: "",
  deny: "",
};

const Register = () => {
  const url = "https://marriage-data.vercel.app/registrationData";
  const { t } = useTranslation();
  const [user, setUser] = useState(initialState);
  const [GroomPhoto, setGroomPhoto] = useState({ Groom_photo: "" });
  const [GroomAadhar, setGroomAadhar] = useState({ Groom_aadharCard: "" });
  const [BridePhoto, setBridePhoto] = useState({ Bride_photo: "" });
  const [BrideAadhar, setBrideAadhar] = useState({ Bride_aadharCard: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    let { name } = e.target;

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        if (name === "Groom_photo") {
          setGroomPhoto({ Groom_photo: reader.result });
        } 
        else if (name === "Groom_aadharCard") {
          setGroomAadhar({ Groom_aadharCard: reader.result });
        }
        else if (name === "Bride_photo") {
          setBridePhoto({ Bride_photo: reader.result });
        }
        else {
          setBrideAadhar({ Bride_aadharCard: reader.result });
        }
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Groom_Name !== "" && Bride_Name !== "" &&
      Groom_MobileNumber !== "" && Bride_MobileNumber !== "" &&
      Groom_DOB !== "" && Bride_DOB !== "" &&
      Groom_religion !== "" && Bride_religion !== "" &&
      Groom_Occupation !== "" && Bride_Occupation !== "" &&
      Groom_MaritalStatus !== "" && Bride_MaritalStatus !== "" &&
      GroomAadhar.Groom_aadharCard !== "" &&  BrideAadhar.Bride_aadharCard!== "" &&
      GroomPhoto.Groom_photo !== "" && BridePhoto.Bride_photo !== ""
    ) {
      let data = { GroomPhoto,GroomAadhar, BridePhoto, BrideAadhar, ...user };

      console.log(data);
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          alert("Registration successfull");
          setUser(initialState);
          setGroomPhoto({ Groom_photo: "" });
          setGroomAadhar({ Groom_aadharCard: "" });
          setBridePhoto({ Bride_photo: "" });
          setBrideAadhar({ Bride_aadharCard: "" });
          navigate("/dashboard");
        })
        .catch(() => alert("Registration failed"));
    } else {
      alert("Please fill the details");
    }
  };

  const { 
    Groom_Name, Groom_DOB, Groom_MobileNumber, Groom_religion, Groom_age, Groom_Occupation,
    Groom_MaritalStatus, Groom_photo, Groom_aadharCard , 
    Bride_Name, Bride_DOB, Bride_MobileNumber, Bride_religion, Bride_age, Bride_Occupation,
    Bride_MaritalStatus , Bride_photo, Bride_aadharCard
  } = user;

  return (
    <Box
      width="60%"
      m="auto"
      p="25px"
      mt="25px"
      borderRadius="5px"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
      rounded="md"
      bg="white"
        //   border="1px solid gray"
    >
      <Text
      fontWeight="bolder"
      >{t("REGISTRATION FORM")}</Text>
      
      <FormControl isRequired>

      <HStack>

      <VStack 
      // border="1px solid gray"
      alignItems="left"
      p="25px">

      <Text
      fontWeight="bold"
      >{t("Groom Details")}</Text>

      
      <HStack>
      <FormLabel
       marginRight="25px">{t("Name")}</FormLabel>
        <Input
          width="40%"
          type="text"
          name="Groom_Name"
          value={Groom_Name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        </HStack>

        <HStack>
         <FormLabel>{t("Mobile No")}</FormLabel>
        <Input
          type="text"
          width="40%"
          name="Groom_MobileNumber"
          value={Groom_MobileNumber}
          onChange={handleInputChange}
          placeholder="Mobile No"
        />
        </HStack>

         <HStack>
         <FormLabel>{t("DOB")}</FormLabel>
        <Input
          type="date"
          width="40%"
          name="Groom_DOB"
          value={Groom_DOB}
          onChange={handleInputChange}
          placeholder="DOB"
        />
        </HStack>

        <HStack>
        <FormLabel>{t("Occupation")}</FormLabel>
        <Select
          name="Groom_Occupation"
          value={Groom_Occupation}
          width="40%"
          onChange={handleInputChange}
        >
          <option>--{t("Select")}--</option>
          <option value="Service">{t("Service")}</option>
          <option value="Business">{t("Business")}</option>
          <option value="Self Employed">{t("Self Employed")}</option>
          <option value="Other">{t("Others")}</option>
        </Select>
        </HStack>

        <HStack>
        <FormLabel>{t("Religion")}</FormLabel>
        <Select
         name="Groom_religion"
         width="40%" 
         value={Groom_religion}
         onChange={handleInputChange}>
          <option>--{t("Select")}--</option>
          <option value="Hindu">{t("Hindu")}</option>
          <option value="Islam">{t("Islam")}</option>
          <option value="Sikhism">{t("Sikhism")}</option>
          <option value="Christianity">{t("Christianity")}</option>
        </Select>
        </HStack>

        <HStack>
        <FormLabel>{t("Marital Status")}</FormLabel>
        <Select
         name="Groom_MaritalStatus" 
         width="40%"
         value={Groom_MaritalStatus}
         onChange={handleInputChange}>
          <option>--{t("Select")}--</option>
          <option value="UnMarried">{t("UnMarried")}</option>
          <option value="Widower">{t("Widower")}</option>
          <option value="Divorcee">{t("Divorcee")}</option>         
        </Select>
        </HStack>

        <HStack>
        <FormLabel>{t("Photo")}</FormLabel>
        <Input
          style={{ border: "none" }}
          width="65%"
          type="file"
          name="Groom_photo"
          value={Groom_photo}
          onChange={handleFileChange}
        />
        </HStack>

        <HStack>
        <FormLabel>{t("Aadhar Card")}</FormLabel>
        <Input
          width="65%"
          type="file"
          style={{ border: "none" }}
          name="Groom_aadharCard"
          value={Groom_aadharCard}
          onChange={handleFileChange}
        />
        </HStack>

      </VStack>

      <VStack
      // border="1px solid red"
      alignItems="left"
      p="25px">

      <Text
      fontWeight="bold"
      >{t("Bride Details")}</Text>

        <HStack>
        <FormLabel>{t("Name")}</FormLabel>
        <Input
          type="text"
          width="40%"
          name="Bride_Name"
          value={Bride_Name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        </HStack>
     
        <HStack>
      <FormLabel>{t("Mobile No")}</FormLabel>
        <Input
          type="text"
          width="40%"
          name="Bride_MobileNumber"
          value={Bride_MobileNumber}
          onChange={handleInputChange}
          placeholder="Mobile No"
        />
        </HStack>

      <HStack>
        <FormLabel>{t("DOB")}</FormLabel>
        <Input
          type="date"
          width="40%"
          name="Bride_DOB"
          value={Bride_DOB}
          onChange={handleInputChange}
          placeholder="DOB"
        />
        </HStack>

        <HStack>
        <FormLabel>{t("Occupation")}</FormLabel>
        <Select
          name="Bride_Occupation"
          width="40%"
          value={Bride_Occupation}
          onChange={handleInputChange}
        >
          <option>--{t("Select")}--</option>
          <option value="Service">{t("Service")}</option>
          <option value="Business">{t("Business")}</option>
          <option value="Self Employed">{t("Self Employed")}</option>
          <option value="Other">{t("Others")}</option>
        </Select>
        </HStack>

        <HStack>
        <FormLabel>{t("Religion")}</FormLabel>
        <Select 
        name="Bride_religion" 
        width="40%"
        value={Bride_religion} 
        onChange={handleInputChange}>
          <option>--{t("Select")}--</option>
          <option value="Hindu">{t("Hindu")}</option>
          <option value="Islam">{t("Islam")}</option>
          <option value="Sikhism">{t("Sikhism")}</option>
          <option value="Christianity">{t("Christianity")}</option>
        </Select>
        </HStack>

        <HStack>
        <FormLabel>{t("Marital Status")}</FormLabel>
        <Select 
         name="Bride_MaritalStatus"
         width="40%"
         value={Bride_MaritalStatus} 
         onChange={handleInputChange}>
          <option>--{t("Select")}--</option>
          <option value="UnMarried">{t("UnMarried")}</option>
          <option value="Widower">{t("Widower")}</option>
          <option value="Divorcee">{t("Divorcee")}</option>
        </Select>
        </HStack>

        <HStack>
        <FormLabel>{t("Photo")}</FormLabel>
        <Input
          style={{ border: "none" }}
          width="65%"
          type="file"
          name="Bride_photo"
          value={Bride_photo}
          onChange={handleFileChange}
        />
        </HStack>

      <HStack>
        <FormLabel>{t("Aadhar Card")}</FormLabel>
        <Input
          type="file"
          width="65%"
          style={{ border: "none" }}
          name="Bride_aadharCard"
          value={Bride_aadharCard}
          onChange={handleFileChange}
        />
        </HStack>
      </VStack>
      </HStack>
        <Button mt={6} colorScheme="teal" type="Signup" onClick={handleSubmit}>
          {t("Submit")}
        </Button>
      </FormControl>
    </Box>
  );
};

export default Register;
