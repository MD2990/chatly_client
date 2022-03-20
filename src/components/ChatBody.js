import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useSnapshot } from "valtio";
import state from "../stor";

export default function ChatBody() {
  const snap = useSnapshot(state);
  console.log(snap.messageList);

  return (
    <VStack
      height={["35vh", "40vh", "50vh", "65vh"]}
      m="2"
      overflowWrap={"break-word"}
    >
      {snap.messageList.map((msg, i) => {
        return (
          <Box
            alignSelf={`
              ${msg.author === snap.username ? "flex-start" : "flex-end"}`}
            spacing={0.2}
            w="fit-content"
            p="1"
            key={i}
            color={`
              ${msg.author === snap.username ? "#E8F6F3" : "#EBF5FB"}`}
            rounded="xl"
            borderBottomLeftRadius={`${
              msg.author !== snap.username ? "15px" : "none"
            }`}
            borderBottomRightRadius={`${
              msg.author === snap.username ? "15px" : "none"
            }`}
            bg={` ${msg.author === snap.username ? "#40E0D0" : "#6495ED"} `}
          >
            <Text fontSize={["xs", "md", "lg", "xl"]}>{msg.message}</Text>

            <Text as="cite" fontSize="xx-small" fontWeight={"hairline"}>
              {msg.time}
            </Text>
            <Text fontSize={"sm"}>
              {msg.author === snap.username ? "You" : msg.author.toUpperCase()}
            </Text>
          </Box>
        );
      })}
    </VStack>
  );
}
