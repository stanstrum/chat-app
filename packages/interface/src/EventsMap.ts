import { Server } from "socket.io";
import type { Message } from ".";

type ToEventsMap<T> = {
  [K in keyof T as K extends string ? K : never]: T[K] extends any[]
    ? (...args: T[K]) => void
    : never;
};

interface ClientToServerEventsMap {
  userJoin: [id: string];
  userLeave: [id: string];
  message: [message: Message, ack: () => void];
  heartbeat: [id: string, ack: () => void];
}

interface ServerToClientEventsMap {
  userJoin: [id: string];
  userLeave: [id: string];
  message: [message: Message];
}

interface InterServerEventsMap {
  ping: [];
}

interface SocketData {}

export type ClientToServerEvents = ToEventsMap<ClientToServerEventsMap>;
export type ServerToClientEvents = ToEventsMap<ServerToClientEventsMap>;
export type InterServerEvents = ToEventsMap<InterServerEventsMap>;

export type TypedServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
