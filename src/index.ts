import { log } from "console";
import { config } from "dotenv";
import express from "express"; // @types
import { bootstrap } from "./app.controller";
import { devConfig } from "./config/dev.config";
import { initSocket } from "./socket-io";
config(); // load env variables

const app = express(); // type of app is Express
const port = devConfig.PORT || 3000;
bootstrap(app, express);
const server = app.listen(port, () => {
  log(`server is running on port ${port}`);
});

// initialize socket.io
initSocket(server);
