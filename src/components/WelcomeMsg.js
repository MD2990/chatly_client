import { Text } from '@chakra-ui/react';
import React from 'react'
import { useSnapshot } from 'valtio';
import state from '../stor';

export default function WelcomeMsg() {
  const snap= useSnapshot(state);
  return (
    <Text
      fontSize={"x-small"}
      fontWeight="light"
      fontStyle={"italic"}
      textAlign={"center"}
    >
      Welcome{" "}
      <Text
        as="span"
        fontSize={"sm"}
        fontWeight={"extrabold"}
        color={"green.300"}
      >
        {snap.username.toUpperCase()}
      </Text>{" "}
      {"  "}
      You Joined Group {""}
      <Text
        as="span"
        fontSize={"sm"}
        fontWeight={"extrabold"}
        color={"green.300"}
      >
        {snap.room}
      </Text>{" "}
    </Text>
  );
}
