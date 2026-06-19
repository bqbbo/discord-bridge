import { io } from "socket.io-client";

const botSocket = io({
    transports: ["polling", "websocket"],
});

const handleConnect = async (token: string) => {
    botSocket.emit("bot:connect", token);
};

export { botSocket, handleConnect };
