import express from "express";

import { createServer } from "node:http";
import { Server } from "socket.io";

import type { TypedServer } from "interface";

import { z } from "zod";
import { processEnv } from "tools";

const env = processEnv({
  API_CORS_ORIGIN: z.string().url().optional(),
  API_PORT: z.number().int().gte(0).lte(65535).default(3000)
});

const app = express();
const httpServer = createServer(app);

let io: TypedServer;
if (env.API_CORS_ORIGIN) {
  io = new Server(httpServer, {
    cors: {
      /** @todo put this in env */
      origin: env.API_CORS_ORIGIN
    },
  });
} else {
  io = new Server(httpServer);
}

io.on("connection", (socket) => {
  console.log(`[connection] ${socket.id}`);

  socket.broadcast.emit("userJoin", socket.id);

  socket.on("disconnect", () => {
    console.log(`[userLeave] ${socket.id}`);

    socket.broadcast.emit("userLeave", socket.id);
  });

  socket.on("message", (message, ack) => {
    console.log(`[message]`);
    console.dir(message, { depth: null });

    socket.broadcast.emit("message", message);

    ack();
  });
});

httpServer.listen(env.API_PORT);
console.log(`Server is listening on port ${env.API_PORT}`);
