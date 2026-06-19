import { io } from "socket.io-client";

const botSocket = io({
    transports: ["polling", "websocket"],
});

const handleConnect = async (token: string) => {
    botSocket.emit("bot:connect", token);
};

const getSocketID = () => {
    return botSocket.id || "Unknown";
};

export { botSocket, getSocketID, handleConnect };
