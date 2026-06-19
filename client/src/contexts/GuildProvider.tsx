import { useState } from "react";
import { GuildContext } from "./GuildContext";
import { GuildInfo } from "../types/bot";

const GuildProvider = ({ children }: { children: React.ReactNode }) => {
    const [guild, setGuild] = useState<GuildInfo>({
        name: "",
        id: "",
    });

    return (
        <GuildContext.Provider value={{ guild, setGuild }}>
            {children}
        </GuildContext.Provider>
    );
};

export default GuildProvider;
