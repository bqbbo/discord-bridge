import { Client, GatewayIntentBits } from "discord.js";

// Each bot process can be extremely intensive to the server.
// You are at risk of DDoS if you allow unlimited bots to connect.
const BOT_LIMIT = Number(process.env.DC_BRIDGE_BOT_LIMIT) || 3;

// activatedBots now maps socketID -> Discord Client
const activatedBots = new Map(); // socketID -> Client
// botCreatedAt maps socketID -> timestamp when the bot was instantiated
const botCreatedAt = new Map(); // socketID -> number (Date.now())
const tokenToSocketID = new Map(); // token -> socketID (to prevent duplicate bot connections)

const createBot = async (socketID, token, io) => {
    const existingSocketID = tokenToSocketID.get(token);
    if (existingSocketID && existingSocketID !== socketID) {
        await destroyBot(existingSocketID, io);
    }

    await destroyBot(socketID, io);

    if (activatedBots.size >= BOT_LIMIT) {
        throw new Error(
            `Bot limit reached. Maximum allowed bots: ${BOT_LIMIT}`,
        );
    }

    const bot = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildVoiceStates,
        ],
    });

    try {
        await bot.login(token);
    } catch (error) {
        destroyBot(socketID, io);
        throw error;
    }

    activatedBots.set(socketID, bot);
    botCreatedAt.set(socketID, Date.now());
    tokenToSocketID.set(token, socketID);
    return bot;
};

const destroyBot = async (socketID, io) => {
    const client = activatedBots.get(socketID);
    if (client) {
        // Remove token mapping for this socketID
        for (const [token, id] of tokenToSocketID.entries()) {
            if (id === socketID) {
                tokenToSocketID.delete(token);
                break;
            }
        }

        if (client && typeof client.destroy === "function") {
            await client.destroy();
        }
        activatedBots.delete(socketID);
        botCreatedAt.delete(socketID);

        // Emit status change to the socket if io instance is provided
        if (io) {
            const socket = io.sockets.sockets.get(socketID);
            if (socket) {
                socket.emit("bot:status", { status: "disconnected" });
            }
        }
    }
};

const getUptime = (socketID) => {
    const createdAt = botCreatedAt.get(socketID);
    if (!createdAt) return null;
    return Date.now() - createdAt;
};

const isBotConnected = (socketID) => {
    const client = activatedBots.get(socketID);
    return client && client.isReady && client.isReady();
};

const getBot = (socketID) => {
    return activatedBots.get(socketID);
};

export {
    activatedBots,
    botCreatedAt,
    createBot,
    destroyBot,
    isBotConnected,
    getBot,
    getUptime,
};
