import { createContext, useContext } from "react";
import { GuildContextType } from "../types/bot";

const GuildContext = createContext<GuildContextType | null>(null);

const useGuild = () => {
    const context = useContext(GuildContext);
    if (!context) {
        throw new Error("useGuild must be used within a guildProvider");
    }
    return context;
};

export { GuildContext, useGuild };
export default useGuild;
