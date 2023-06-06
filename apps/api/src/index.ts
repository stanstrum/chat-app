import express from "express";

import { createServer } from "node:http";
import { Server } from "socket.io";

import type { TypedServer } from "interface";

const app = express();

const httpServer = createServer(app);
const io: TypedServer = new Server(httpServer, {
  cors: {
    /** @todo put this in env */
    origin: "http://localhost:5173",
  },
});

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

httpServer.listen(3000);
console.log("Server is listening on port 3000");
