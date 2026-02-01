import { io } from "socket.io-client";

const Api = import.meta.env.VITE_API_URL;
const SOCKET_URL = Api;

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false, // important
});
