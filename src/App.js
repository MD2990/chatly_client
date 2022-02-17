import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import { Button, Input, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useSnapshot } from "valtio";
import state from "./stor";

const socket = io.connect("https://chatly02.herokuapp.com/");

function App() {
  const snap= useSnapshot(state);


  useEffect(() => {
    socket.on("login", (data) => {
      state.showChat = true;
      
    });
    socket.on("error", (data) => {
      alert(data.message);
    });

    return () => socket.disconnect();
  }, []);
  const joinRoom = () => {
    if (snap.username !== "" && snap.room !== "") {
      const data = { username:snap.username, room:snap.room };
      socket.emit("join_room", data);
      socket.emit("online", data);
    }
  };

  return (
    <div className="App">
      {!snap.showChat ? (
        <Wrap
          direction={"column"}
          justify={"center"}
          spacing={[1, 2, 3]}
          color={"twitter.500"}
          borderRadius={"lg"}
          boxShadow={["md", "lg", "xl"]}
          textShadow={`0px 0px 10px lightgray`}
          p={[4, 8, 12, 24]}
          m="4"
        >
          <Text fontSize={["2xl", "4xl", "6xl", "7xl"]} textAlign={"center"}>
            Join A Chat
          </Text>
          <WrapItem>
            <Input
              size={"lg"}
              placeholder="Your Name... At least 4 character"
              onChange={(event) => {
                state.username = event.target.value;
                
              }}
            />
          </WrapItem>

          <WrapItem>
            <Input
              size={"lg"}
              placeholder="Room ID... At least 4 characters"
              onChange={(event) => {
                state.room = event.target.value;
                
              }}
            />
          </WrapItem>

          <WrapItem alignSelf={"center"}>
            <Button
              disabled={snap.username.trim().length < 4 || snap.room.trim().length < 4}
              size={"lg"}
              fontSize={[12, 16, 22, 28]}
              p={[2, 4, 8, 10]}
              onClick={joinRoom}
            >
              Join A Room
            </Button>
          </WrapItem>
        </Wrap>
      ) : (
        <Chat socket={socket} />
      )}
    </div>
  );
}

export default App;
