import { Dispatch, SetStateAction } from "react";

export interface Statuses {
    status: "connected" | "connecting" | "error" | "update" | "disconnected";
    tag?: string;
    message?: string;
}

export type StatusContextType = {
    status: Statuses;
    setStatus: Dispatch<SetStateAction<Statuses>>;
};

export const RenderStatus = {
    connected: "Connected!",
    connecting: "Connecting...",
    error: "Error: See alerts.",
    update: "Received an update.",
    disconnected: "Disconnected.",
};
