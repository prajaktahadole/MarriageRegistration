import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const url ="https://marriage-data.vercel.app/registrationData";
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const { isUser, isAdmin } = useContext(AuthContext);

  const getData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
     console.log(data);
  }, []);

  const handleApprove = (elem) => {
    let updatedData = { ...elem, accept: "Your profile accepted" };

    console.log(updatedData, "HEY ");
    fetch(`${url}/${elem.id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedData),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        alert("Profile approved!");
      })
      .catch(() => alert("Failed updation"));
  };

  const handleReject = (elem) => {
    let updatedData = { ...elem, deny: "Your documents are invalid!" };
    console.log(updatedData);
    fetch(`${url}/${elem.id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedData),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        alert("Profile rejected!");
      })
      .catch(() => alert("Failed"));
  };

  return (
    <Box>
      <Box m="10px">
        <SimpleGrid columns={[1, 2, 3, 4]} spacing="20px">
          {console.log(data)}
          {data &&
            data.map((elem) => {
              return (
                <Box
                  key={elem.id}
                  width="100%"
                  borderWidth="2px"
                  borderRadius="md"
                  border="1px solid rgba(0, 0, 0, 0.30)"
                  overflow="hidden"
                >

                  <HStack
                   position="relative"
                   height="150px"
                   margin="3px"
                   justifyContent="center">

                      <Image
                      height="120px"
                      src={elem.GroomPhoto.Groom_Photo}
                      alt="profile"
                       />
                      <Image
                      height="120px"
                      src={elem.BridePhoto.Bride_Photo}
                      alt="profile"
                    />
                  </HStack>




                 

                  <VStack>
                    {/* <Text as="b">Name : {elem.name}</Text>
                    <Text as="b">Age : {elem.age}</Text>
                    <Text as="b">Profession : {elem.profession}</Text>
                    <Text as="b">Gender : {elem.gender}</Text>
                    <Text as="b">Religion : {elem.religion}</Text> */}
                    
                    
                    {isUser ? (
                      elem.accept !== "" ? (
                        <Text color="teal">{elem.accept}✅</Text>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}

                    {isUser ? (
                      elem.deny !== "" ? (
                        <Text color="red">{elem.deny}</Text>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </VStack>

                  {isAdmin ? (
                    <Flex justifyContent="space-around" m="5px">
                      <Button
                        colorScheme="green"
                        onClick={() => {
                          handleApprove(elem);
                        }}
                      >
                        {t("Approve")}
                      </Button>
                      <Button
                        disabled={elem.accept !== ""}
                        colorScheme="red"
                        onClick={() => handleReject(elem)}
                      >
                        {t("Deny")}
                      </Button>
                    </Flex>
                  ) : (
                    ""
                  )}
                </Box>
              );
            })}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Dashboard;
