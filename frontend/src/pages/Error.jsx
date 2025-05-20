import React from "react";
import {
  Container,
  Heading,
  Flex,
  Text,
  Box,
  Button,
  Center,
  Link,
} from "@chakra-ui/react";
import { House } from "lucide-react";
import { useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();
  return (
    <Center height={"100dvh"}>
      <Container p={"4"} px={"8"}>
        <Flex direction={"column"} alignItems={"center"} gap={2}>
          <Heading
            textStyle={{ base: "6xl", md: "7xl" }}
            fontWeight={"medium"}
            transition="all 150ms ease-in-out"
          >
            404
          </Heading>
          <Box color={"gray.200"} textAlign={"center"}>
            <Text>PAGE NOT FOUND</Text>
            <Text>You shouldn't be here!</Text>
          </Box>
          <Link
            color={{ _hover: "teal.500" }}
            p={2}
            onClick={() => navigate("/")}
            transition={"all"}
          >
            <House />
          </Link>
        </Flex>
      </Container>
    </Center>
  );
};

export default Error;
