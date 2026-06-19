import { useState, useEffect } from "react";
import { fetchGuilds } from "../scripts/botEnvironment";

import { GuildsResponse } from "../types/socket";
import useStatus from "../contexts/StatusContext";

import { Button, DropdownInput } from "./Button";

import "../styles/ServerSelect.css";

const ServerSelect = () => {
    const { status } = useStatus();
    const [guilds, setGuilds] = useState<GuildsResponse["guilds"]>([]);
    const [selectedGuild, setSelectedGuild] = useState<string | null>(null);

    const doFetchGuilds = () => {
        fetchGuilds((response) => {
            // Don't check response status because an error state would be automatically emitted by the server
            setGuilds(response.guilds);
        });
    };

    useEffect(() => {
        if (status.status === "connected") doFetchGuilds();

        // Clear on disconnect (deferred to avoid sync setState in effect)
        if (status.status === "disconnected") {
            const t = setTimeout(() => {
                setGuilds([]);
                setSelectedGuild(null);
            }, 0);
            return () => clearTimeout(t);
        }
    }, [status]);

    return (
        <div className="server-select">
            <div className="server-select-input">
                <p>Select Server</p>
                <DropdownInput
                    className="server-select-dropdown"
                    placeholder="No servers available"
                    options={guilds.map((g) => g.name)}
                    onChange={(value) => setSelectedGuild(value)}
                />
                <Button
                    className="server-select-refresh-button"
                    text="Refresh"
                    onClick={() => {}}
                />
            </div>
            <div className="server-select-info">
                <p>Server Name: {selectedGuild || "Unknown"}</p>
                <p>
                    Server ID:{" "}
                    {selectedGuild ?
                        guilds.find((g) => g.name === selectedGuild)?.id
                    :   "Unknown"}
                </p>
                <p>
                    Member Count:{" "}
                    {selectedGuild ?
                        guilds.find((g) => g.name === selectedGuild)
                            ?.memberCount
                    :   "N/A"}
                </p>
            </div>
        </div>
    );
};

export default ServerSelect;
