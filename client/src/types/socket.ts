export type PingResponse = {
    clientTs: number;
    serverTs: number;
    discordPing?: number | null;
};
