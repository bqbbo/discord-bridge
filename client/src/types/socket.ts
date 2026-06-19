export type PingResponse = {
    clientTs: number;
    serverTs: number;
    discordPing?: number | null;
};

export type GuildInfo = {
    id: string;
    name: string;
    iconURL?: string | null;
    memberCount?: number;
};

export type GuildsResponse = {
    status: "ok" | "error";
    guilds: GuildInfo[];
    message?: string;
};
