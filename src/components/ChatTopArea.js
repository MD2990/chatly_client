import { Box, HStack, IconButton, Text } from '@chakra-ui/react';
import React from 'react'
import { BiLogOutCircle } from 'react-icons/bi';
import { useSnapshot } from 'valtio';
import state from '../stor';

export default function ChatTopArea({ socket }) {
    const snap= useSnapshot(state);


    // on logout button click emit logout event
      const exit = () => {
        socket.emit("exit", { room: snap.room });
        window.location.reload();
      };
  return (
    <Box
      h="auto"
      borderTopRadius={"lg"}
      position="relative"
      display="block"
      color={"twitter.50"}
      fontWeight="extrabold"
      lineHeight="45px"
      bg="twitter.500"
    >
      <HStack
        fontSize={["xs", "sm", "md", "lg"]}
        justify={"space-between"}
        align={"center"}
        p="2"
        spacing={[1, 2, 3]}
      >
        <Text isTruncated fontSize={["xs", "sm", "md"]} color={"red.100"}>
          {" "}
          {snap.room.toUpperCase()}
        </Text>
        <Text isTruncated>
          {snap.isTyping && `${snap.isTyping} is Typing...`}{" "}
        </Text>
        <IconButton
          _focus={{ boxShadow: "none" }}
          variant="unstyled"
          aria-label="Logout"
          color={"red.200"}
          icon={<BiLogOutCircle size={"2rem"} />}
          onClick={exit}
        />
      </HStack>
    </Box>
  );
}
