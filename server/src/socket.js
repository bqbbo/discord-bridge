import {
    activatedBots,
    createBot,
    destroyBot,
    isBotConnected,
    getBot,
    getUptime,
} from "./bot.js";

const initSocket = (io) => {
    io.on("connection", (socket) => {
        console.log(`User connected: IP ${socket.handshake.address}`);

        socket.on("bot:connect", async (token) => {
            console.log(`Attempting to connect bot: ${token}`);
            socket.emit("bot:status", { status: "connecting" });
            try {
                const client = await createBot(socket.id, token, io);
                socket.emit("bot:status", {
                    status: "connected",
                    tag: client.user?.tag,
                });
            } catch (error) {
                console.error("Error connecting bot:", error);
                socket.emit("bot:status", {
                    status: "error",
                    message: error.message,
                });

                /*
                /  Because some errors do not actually bring down the bot,
                /  we recheck the bot's connection status after a short delay to determine if it is truly disconnected.
                */

                setTimeout(() => {
                    const isConnected = isBotConnected(socket.id);
                    const finalStatus =
                        isConnected ? "connected" : "disconnected";
                    const bot = getBot(socket.id);

                    socket.emit("bot:status", {
                        status: finalStatus,
                        tag: isConnected ? bot?.user?.tag : undefined,
                        message:
                            isConnected ? undefined : "Bot failed to connect.",
                    });
                }, 3000);
            }

            console.log(`Current bots: ${[...activatedBots.keys()]}`);
        });

        socket.on("bot:getUptime", (socketID) => {
            const uptime = getUptime(socketID);
            socket.emit("bot:uptime", { uptime });
        });

        socket.on("ping:request", (clientTs) => {
            const client = getBot(socket.id);

            /*
            /  This implementation uses the 5s ping interval provided by the client
            /  to determine if the bot connection is healthy. The server will reverify
            /  the bot's connection status on each ping request to catch any mid-session disconnects,
            /  then will resume with the regular ping response if the connection is healthy.
            /  The bot has a 3s grace period (implementation above) after an error is detected before a disconnect is reported.
            */

            const isConnected = client && client.isReady && client.isReady();
            if (!isConnected && client) {
                // Verify the connection existed in the first place

                // Notify client that the bot connection appears down
                socket.emit("bot:status", {
                    status: "error",
                    message: "Bot not connected",
                });

                // Reset to null on a Bot disconnect so UI updates correctly
                socket.emit("ping:response", {
                    clientTs,
                    serverTs: Date.now(),
                    discordPing: null,
                });
                return;
            }

            // discord.js may report -1 when ping is not yet available; normalize to null
            let discordPing = null;
            const raw = client?.ws?.ping;
            if (typeof raw === "number" && raw >= 0) {
                discordPing = raw;
            }

            socket.emit("ping:response", {
                clientTs,
                serverTs: Date.now(),
                discordPing,
            });
        });

        socket.on("bot:getGuilds", async () => {
            try {
                const client = getBot(socket.id);

                const guilds = await Promise.all(
                    client.guilds.cache.map(async (cachedGuild) => {
                        const freshGuild = await client.guilds
                            .fetch(cachedGuild.id)
                            .catch(() => cachedGuild);

                        return {
                            id: freshGuild.id,
                            name:
                                freshGuild.name ||
                                cachedGuild.name ||
                                cachedGuild.id,
                            iconURL:
                                typeof freshGuild.iconURL === "function" ?
                                    freshGuild.iconURL({ size: 64 })
                                :   null,
                            memberCount:
                                typeof freshGuild.memberCount === "number" ?
                                    freshGuild.memberCount
                                : typeof cachedGuild.memberCount === "number" ?
                                    cachedGuild.memberCount
                                :   undefined,
                        };
                    }),
                );

                socket.emit("bot:guilds", {
                    status: "ok",
                    guilds,
                });

                // Instead of hijacking the original status socket, we just emit another one separately
                socket.emit("bot:status", {
                    status: "update",
                    message: `Fetched ${guilds.length} guild(s)`,
                    tag: client.user?.tag,
                });
            } catch (err) {
                const msg = err?.message || String(err);
                // Should the error status emit the tag?
                // Should we only emit connect/disconnect status and have update/error/connecting be separate and only emit messages on the update/error ones?
                socket.emit("bot:guilds", {
                    status: "error",
                    message: msg,
                    guilds: [],
                });

                socket.emit("bot:status", {
                    status: "error",
                    message: msg,
                });
            }
        });

        socket.on("bot:disconnect", async () => {
            await destroyBot(socket.id, io);
            socket.emit("bot:status", { status: "disconnected" });
        });

        socket.on("disconnect", async () => {
            await destroyBot(socket.id, io);
            console.log(`User disconnected: IP ${socket.handshake.address}`);
        });
    });
};

export { initSocket };
