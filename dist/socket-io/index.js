"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const middleware_1 = require("./middleware");
const chat_1 = require("./chat");
// map is a data structure that stores key-value pairs
const userConnected = new Map();
// initialize socket.io
const initSocket = (server) => {
    // type of server is httpServer from app.listen()
    const io = new socket_io_1.Server(server, { cors: { origin: "*" } }); // type of io is Server from socket.io
    // authentication middleware
    io.use(middleware_1.socketAuth);
    // handle connection
    io.on("connection", (socket) => {
        // when user connect set user id and socket id in map
        // serch on user by id and update socket id
        userConnected.set(socket.data.user._id, socket.id); // set is Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.
        console.log("a user connected");
        // send message 
        socket.on("send-message", (0, chat_1.sendMessage)(socket, io, userConnected));
    });
};
exports.initSocket = initSocket;
