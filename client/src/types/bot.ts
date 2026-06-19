import { Dispatch, SetStateAction } from "react";

export type GuildInfo = {
    id: string;
    name: string;
    iconURL?: string | null;
    memberCount?: number;
};

export type GuildContextType = {
    guild: GuildInfo;
    setGuild: Dispatch<SetStateAction<GuildInfo>>;
};

export type GuildsResponse = {
    status: "ok" | "error";
    guilds: GuildInfo[];
    message?: string;
};
