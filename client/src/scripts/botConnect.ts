import handleStatusChange from "./status";
import { io } from "socket.io-client";

const socket = io({
    transports: ["polling", "websocket"],
});

socket.on("bot:status", (status) => {
    handleStatusChange(status);
});

const handleConnect = async (token: string) => {
    socket.emit("bot:connect", token);
};

export { handleConnect };
