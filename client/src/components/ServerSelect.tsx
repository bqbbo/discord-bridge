import { useCallback, useState, useEffect } from "react";
import { fetchGuilds } from "../scripts/botEnvironment";

import { GuildsResponse } from "../types/bot";
import useStatus from "../contexts/StatusContext";
import useGuild from "../contexts/GuildContext";

import { GuildInfo } from "../types/bot";

import { Button, DropdownInput } from "./Button";

import "../styles/ServerSelect.css";

const ServerSelect = () => {
    const { status } = useStatus();
    const { setGuild } = useGuild();
    const [guilds, setGuilds] = useState<GuildsResponse["guilds"]>([]);
    const [selectedGuildId, setSelectedGuildId] = useState<string | null>(null);

    const doFetchGuilds = useCallback(() => {
        fetchGuilds(status, (response) => {
            // Don't check response status because an error state would be automatically emitted by the server
            setSelectedGuildId(null); // Reset to default option on every refresh
            setGuilds(response.guilds);
        });
    }, [status]);

    useEffect(() => {
        if (status.status === "connected" || status.status === "disconnected")
            doFetchGuilds();
    }, [status, doFetchGuilds]);

    const selectedGuild =
        guilds.find((guild: GuildInfo) => guild.id === selectedGuildId) ?? null;

    // keep guild context in sync with the selected guild id
    useEffect(() => {
        if (selectedGuild) {
            setGuild(selectedGuild);
        } else {
            // clear to an empty guild when nothing is selected
            setGuild({ id: "", name: "" });
        }
    }, [selectedGuild, setGuild]);

    const dropdownOptions = guilds.map((guild: GuildInfo) => ({
        label: guild.name,
        value: guild.id,
    }));

    return (
        <div className="server-select">
            <div className="server-select-input">
                <p>Select Server</p>
                <DropdownInput
                    className="server-select-dropdown"
                    placeholder="No servers available"
                    options={dropdownOptions}
                    value={selectedGuildId}
                    onChange={setSelectedGuildId}
                />
                <Button
                    className="server-select-refresh-button"
                    text="Refresh"
                    onClick={() => doFetchGuilds()}
                />
            </div>
            <div className="server-select-info">
                <p>Server Name: {selectedGuild?.name || "Unknown"}</p>
                <p>Server ID: {selectedGuild ? selectedGuild.id : "Unknown"}</p>
                <p>
                    Member Count:{" "}
                    {selectedGuild ? selectedGuild.memberCount : "N/A"}
                </p>
            </div>
        </div>
    );
};

export default ServerSelect;
