import { Center, Text } from "@chakra-ui/react";
import React from "react";
import { useSnapshot } from "valtio";
import state from "../stor";

export default function WelcomeMsg() {
  const snap = useSnapshot(state);
  return (
    <Center p={1} textAlign="center" fontSize={"x-small"}>
      <Text fontWeight="light" fontStyle={"italic"}>
        Welcome{" "}
        <Text
          as="span"
      
          fontWeight={"extrabold"}
          color={"green.300"}
        >
          {snap.username.toUpperCase()}
        </Text>{" "}
        {"  "}
        You Joined Group {""}
        <Text
          as="span"
      
          fontWeight={"extrabold"}
          color={"green.300"}
        >
          {snap.room}
        </Text>{" "}
      </Text>
    </Center>
  );
}
