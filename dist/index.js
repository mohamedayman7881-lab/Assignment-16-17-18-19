"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express")); // @types
const app_controller_1 = require("./app.controller");
const dev_config_1 = require("./config/dev.config");
const socket_io_1 = require("./socket-io");
(0, dotenv_1.config)(); // load env variables
const app = (0, express_1.default)(); // type of app is Express
const port = dev_config_1.devConfig.PORT || 3000;
(0, app_controller_1.bootstrap)(app, express_1.default);
const server = app.listen(port, () => {
    (0, console_1.log)(`server is running on port ${port}`);
});
// initialize socket.io
(0, socket_io_1.initSocket)(server);
