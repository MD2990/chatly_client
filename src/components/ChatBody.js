import { Box, Text } from '@chakra-ui/react';
import React from 'react'
import { useSnapshot } from 'valtio';
import state from '../stor';

export default function ChatBody() {

const snap= useSnapshot(state);

  return (
    <>
      {snap.messageList.map((messageContent, i) => {
        return (
          <Box
            key={i}
            className="message"
            id={snap.username === messageContent.author ? "you" : "other"}
          >
            <Box>
              <Box
                className="message-content"
                fontSize={["sm", "md", "lg", "xl"]}
              >
                <Text p="1">{messageContent.message}</Text>
              </Box>
              <Box className="message-meta">
                <p id="time">{messageContent.time}</p>
                <p id="author">
                  {messageContent.author === snap.username
                    ? "You"
                    : messageContent.author.toUpperCase()}
                </p>
              </Box>
            </Box>
          </Box>
        );
      })}
    </>
  );
}
