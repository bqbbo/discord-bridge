import { useState, useEffect } from "react";
import { Button, TextInput } from "./Button";
import { botSocket, handleConnect, getSocketID } from "../scripts/botSocket";

import useStatus from "../contexts/StatusContext";
import { APIFormUser } from "../scripts/statusRendering";
import { Statuses } from "../types/statuses";

import "../styles/APIForm.css";

const APIForm = () => {
    const { status } = useStatus();
    const [token, setToken] = useState("");
    const [uptime, setUptime] = useState<number | null>(null);
    const [socketID, setSocketID] = useState(getSocketID());

    useEffect(() => {
        const onStatus = (update: Statuses) => {
            if (update.status === "connected") {
                setUptime(0);
            } else {
                setUptime(null);
            }
        };

        const onConnect = () => setSocketID(botSocket.id || "Unknown");
        const onDisconnect = () => setSocketID("Unknown");

        botSocket.on("bot:status", onStatus);
        botSocket.on("connect", onConnect);
        botSocket.on("disconnect", onDisconnect);

        const uptimeInterval = setInterval(() => {
            setUptime((prev) => (prev === null ? null : prev + 1000));
        }, 1000);

        return () => {
            botSocket.off("bot:status", onStatus);
            botSocket.off("connect", onConnect);
            botSocket.off("disconnect", onDisconnect);
            clearInterval(uptimeInterval);
        };
    }, []);

    return (
        <div className="api-form component-secondary">
            <div className="api-form-input">
                <TextInput
                    className="api-form-token-input"
                    placeholder="Enter API Key"
                    onChange={setToken}
                />
                <Button
                    className="api-form-connect-button"
                    text="Connect"
                    onClick={async () => await handleConnect(token)}
                />
            </div>
            <div className="api-form-info">
                <p>Username: {APIFormUser(status)}</p>
                <p>Socket ID: {socketID}</p>
                <p>
                    Uptime:{" "}
                    {uptime !== null ? `${Math.floor(uptime / 1000)}s` : "N/A"}
                </p>
            </div>
        </div>
    );
};

export default APIForm;
