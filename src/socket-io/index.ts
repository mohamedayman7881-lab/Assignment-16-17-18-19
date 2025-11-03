import { Server as httpServer } from "node:http"; // give alias to httpServer
import { Server, Socket } from "socket.io";
import { socketAuth } from "./middleware";
import { sendMessage } from "./chat";

// map is a data structure that stores key-value pairs
const userConnected = new Map<string, string>();

// initialize socket.io
export const initSocket = (server: httpServer) => {
  // type of server is httpServer from app.listen()
  const io = new Server(server, { cors: { origin: "*" } }); // type of io is Server from socket.io

  // authentication middleware
  io.use(socketAuth);

  // handle connection
  io.on("connection", (socket: Socket) => {
    // when user connect set user id and socket id in map
    // serch on user by id and update socket id
    userConnected.set(socket.data.user._id, socket.id); // set is Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.
    console.log("a user connected");

    // send message 
    socket.on("send-message", sendMessage(socket, io, userConnected));
  });
};
