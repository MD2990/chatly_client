import { HStack, IconButton, Textarea } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { MdSend } from "react-icons/md";
import { useSnapshot } from "valtio";
import state from "../stor";

export default function TextAreaMsg({ socket }) {
  const snap = useSnapshot(state);

  const currentMessage = useRef("");
  useEffect(() => {
    socket.on("receive_message", (data) => {
      state.messageList.push(data);
    });

    return () => socket.disconnect();
  }, [socket]);

  const currentTime = () =>    
  // get current time hour:minute:second format 00:00:00 with leading zeros
    new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  const sendMessage = async () => {

    if (currentMessage.current.value.trim() !== "") {
      const messageData = {
        room: snap.room,
        author: snap.username,
        message: currentMessage.current.value,
        time: currentTime(),
      };

      await socket.emit("send_message", messageData);
      state.messageList.push( messageData);
      currentMessage.current.value = "";
      currentMessage.current.focus();
    }
  };
  return (
    <HStack boxShadow={["0px 0px 30px 0px #bcc3c5"]} borderBottomRadius="2xl">
      <Textarea
        fontSize={["sm", "md", "lg", "xl"]}
        
        p="6"
        m='2'
        minH={"8rem"}
        ref={currentMessage}
        placeholder="Type your message here..."
        onKeyPress={(e) => {
          if (e.key === "Enter" && socket.connected) {
            sendMessage();

            e.preventDefault();
          }
        }}
        onFocus={(e) => {
          socket.emit("typing", { room:snap.room, username:snap.username });
        }}
        onBlur={(e) => {
          socket.emit("stoppedTyping", { room:snap.room  , username: snap.username });
        }}
      />

      <IconButton
        disabled={!socket.connected}
        _focus={{ boxShadow: "none" }}
        variant="unstyled"
        aria-label="Send message"
        icon={<MdSend color="lightGreen" size={"2.5rem"} />}
        onClick={sendMessage}
      />
    </HStack>
  );
}
