import { measurePing } from "../scripts/botSocket";
import { useState, useEffect } from "react";

import "../styles/NetStats.css";

const NetStats = () => {
    const [discordPing, setDiscordPing] = useState<number | null>(null);
    const [socketPing, setSocketPing] = useState<number | null>(null);

    useEffect(() => {
        measurePing((response) => {
            setDiscordPing(response.discordPing);
            setSocketPing(response.socketOneWay);
        });

        const interval = setInterval(() => {
            measurePing((response) => {
                setDiscordPing(response.discordPing);
                setSocketPing(response.socketOneWay);
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="net-stats">
            <p>
                Discord Ping:{" "}
                {discordPing !== null ? `${discordPing}ms` : "N/A"}
            </p>
            <p>
                Socket Ping: {socketPing !== null ? `${socketPing}ms` : "N/A"}
            </p>
        </div>
    );
};

export default NetStats;
