import { io } from "socket.io-client";
import { PingResponse } from "../types/socket";

const botSocket = io({
    transports: ["polling", "websocket"],
});

const handleConnect = (token: string) => {
    botSocket.emit("bot:connect", token);
};

const getSocketID = () => {
    return botSocket.id || "Unknown";
};

const measurePing = (
    cb: (r: {
        socketRTT: number;
        socketOneWay: number;
        discordPing: number | null;
        serverTs: number;
    }) => void,
) => {
    const clientTs = Date.now();
    const onResp = (payload: PingResponse) => {
        const now = Date.now();
        const rtt = now - payload.clientTs;
        const oneWay = rtt / 2;
        const discordPing = payload.discordPing ?? null;
        botSocket.off("ping:response", onResp);
        cb({
            socketRTT: rtt,
            socketOneWay: oneWay,
            discordPing,
            serverTs: payload.serverTs,
        });
    };
    botSocket.on("ping:response", onResp);
    botSocket.emit("ping:request", clientTs);
};

export { botSocket, getSocketID, handleConnect, measurePing };
