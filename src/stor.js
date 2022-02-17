import { proxy } from "valtio";

const state = proxy({
  messageList: [],
  username: "",
  msg: [],
  id: null,
  room: "",
  showChat: false,
  onlineUsers: [],
  isTyping: null,
  loggedOutUsers: [],
});

export default state;
