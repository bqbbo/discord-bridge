import { botSocket } from "./botSocket";
import { GuildsResponse } from "../types/socket";

import { Statuses } from "../types/statuses";

const fetchGuilds = (status: Statuses, cb: (r: GuildsResponse) => void) => {
    if (status.status === "disconnected") {
        cb({ status: "ok", guilds: [] });
        return;
    }

    const onResp = (payload: GuildsResponse) => {
        botSocket.off("bot:guilds", onResp);
        cb(payload);
    };
    botSocket.on("bot:guilds", onResp);
    botSocket.emit("bot:getGuilds");
};

const fetchChannels = (guildId: string, cb: (r: string) => void) => {
    return [guildId, cb];
};

export { fetchGuilds, fetchChannels };
