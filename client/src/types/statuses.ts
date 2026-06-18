export default interface Statuses {
    status: "connected" | "connecting" | "error" | "update" | "disconnected";
    tag?: string;
    message?: string;
}

export const RenderStatus = {
    connected: "Connected!",
    connecting: "Connecting...",
    error: "Error: See alerts.",
    update: "Received an update.",
    disconnected: "Disconnected.",
};
