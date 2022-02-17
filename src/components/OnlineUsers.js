import { Box, HStack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react'
import { useSnapshot } from 'valtio';
import state from '../stor';

export default function OnlineUsers() {
    const snap= useSnapshot(state);
  
    return (
    <HStack alignSelf={"flex-start"} align={"flex-start"}>
      <Box>
        <Text
          p="4"
          textAlign={"left"}
          fontSize={["md", "lg", "xl", "2xl"]}
          color={"twitter.600"}
          textDecor={"underline"}
          fontWeight={"semibold"}
          textShadow={`0px 0px 20px lightGray`}
        >
          {snap.onlineUsers.length > 1
            ? `Total Online Users ${snap.onlineUsers.length - 1}`
            : "No Online Users"}
        </Text>
        {snap.onlineUsers.length > 1 && (
          <Wrap spacing={[0.5, 1, 2]} maxW="28rem">
            {snap.onlineUsers.map((u, i) => (
              <WrapItem
                key={u.id}
                onClick={() => console.log(u.id)}
                px={[0.1, 0.3, 0.6, 1]}
                w={["60px", "80px", "100px", "120px"]}
                h={["60px", "80px", "100px", "120px"]}
                lineHeight={["60px", "80px", "100px", "120px"]}
                borderRadius="50%"
                align="center"
                color="black"
                textAlign="center"
                bg={
                  u.user.toUpperCase() === snap.username.toUpperCase()
                    ? "gray.50"
                    : "blue.50"
                }
                verticalAlign="middle"
                display={"table-cell"}
              >
                <Text
                  isTruncated
                  textAlign={"center"}
                  fontSize={["xs", "sm", "md", "lg"]}
                  color={
                    u.user.toUpperCase() === snap.username.toUpperCase()
                      ? "gray.400"
                      : "blue.500"
                  }
                  fontWeight={"medium"}
                >
                  {u.user.toUpperCase() === snap.username.toUpperCase() ? (
                    <Text as="span" fontSize={"xs"} fontWeight={"bold"}>
                      {u.user.toUpperCase()}{" "}
                      <Text
                        as="span"
                        fontSize={"xx-small"}
                        fontWeight={"hairline"}
                      >
                        {"(You)"}
                      </Text>
                    </Text>
                  ) : (
                    `${u.user.toUpperCase()}`
                  )}
                </Text>
              </WrapItem>
            ))}
          </Wrap>
        )}
      </Box>
    </HStack>
  );
}
