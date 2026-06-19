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

                // Check connection status after 3 seconds to clarify ambiguous error state
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
            const client = getBot(socket.id); // returns Discord Client
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

        socket.on("disconnect", async () => {
            await destroyBot(socket.id, io);
            console.log(`User disconnected: IP ${socket.handshake.address}`);
        });
    });
};

export { initSocket };
