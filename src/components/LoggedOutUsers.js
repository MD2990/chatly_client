import { Text } from '@chakra-ui/react';
import React from 'react'
import { useSnapshot } from 'valtio';
import state from '../stor';

export default function LoggedOutUsers() {
    const snap= useSnapshot(state);
  return (
    <>
      {snap.loggedOutUsers &&
        snap.loggedOutUsers.map((u) => (
          <Text
            key={u.id}
            textAlign={"center"}
            fontSize={"xs"}
            fontStyle={"italic"}
          >
            <Text
              textTransform={"uppercase"}
              fontSize={"sm"}
              fontWeight={"black"}
              as="span"
              color={"green.300"}
            >
              {u.user}
            </Text>{" "}
            Left{" "}
          </Text>
        ))}
    </>
  );
}
