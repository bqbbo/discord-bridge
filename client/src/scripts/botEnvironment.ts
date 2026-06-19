import { botSocket } from "./botSocket";
import { GuildsResponse } from "../types/socket";

const fetchGuilds = (cb: (r: GuildsResponse) => void) => {
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
