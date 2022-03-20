import React, { useEffect } from "react";
import { Center, useToast, Wrap, WrapItem } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
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
    <Center>
      <Wrap
        minW="10rem"
        direction={"column"}
        m="4"
        
        w={["30%" , "45%", "55%", "70%"]}
        rounded="2xl"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.5)"
      >
        <WrapItem>
          <HStack w="full">
            <ChatTopArea socket={socket} />
          </HStack>
        </WrapItem>

        <ScrollToBottom>
          <WelcomeMsg />

          <LoggedOutUsers />
          <ChatBody />
        </ScrollToBottom>

        <TextAreaMsg socket={socket} />
      
      </Wrap>  
       <OnlineUsers /> 
    </Center>
  );
}

export default Chat;
