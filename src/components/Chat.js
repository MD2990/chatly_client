import React, { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { Box, HStack } from "@chakra-ui/react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSnapshot } from "valtio";
import state from "../stor";
import ChatBody from "./ChatBody";
import LoggedOutUsers from "./LoggedOutUsers";
import TextAreaMsg from "./TextAreaMsg";
import OnlineUsers from "./OnlineUsers";
import ChatTopArea from "./ChatTopArea";
import WelcomeMsg from "./WelcomeMsg";
function Chat({ socket }) {
  const toast = useToast();

  const snap = useSnapshot(state);

  useEffect(() => {
    socket.on("typing", ({ user }) => {
      user !== snap.username && (state.isTyping = user);
    });

    socket.on("stoppedTyping", () => {
      state.isTyping = null;
    });

    socket.on("online", ({ users }) => {
      state.onlineUsers = users;
    });

    socket.on("logout", (loggedOutUser) => {
      toast({
        title: "User logged out",
        description: `${loggedOutUser.user} Left the chat`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      state.loggedOutUsers.push(loggedOutUser);
      state.onlineUsers = state.onlineUsers.filter(
        (u) => u.id !== loggedOutUser.id
      );
    });

    return () => socket.disconnect();
  }, [snap.username, socket, toast]);

  return (
    <HStack
      justify={"center"}
      justifyContent="flex-start"
      align={"flex-start"}
      m="5"
      p="5"
    >
      <OnlineUsers />

      <Box className="chat-window">
        <ChatTopArea socket={socket} />

        <Box className="chat-body">
          <ScrollToBottom className="message-container">
            <WelcomeMsg />

            <LoggedOutUsers />
            <ChatBody />
          </ScrollToBottom>
        </Box>
        <TextAreaMsg socket={socket} />
      </Box>
    </HStack>
  );
}

export default Chat;
