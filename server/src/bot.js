import { Client, GatewayIntentBits } from "discord.js";

const activatedBots = new Map(); // socketID -> client's bot instance
const tokenToSocketID = new Map(); // token -> socketID (to prevent duplicate bot connections)

const createBot = async (socketID, token, io) => {
    // Check if this token is already in use by another socket
    const existingSocketID = tokenToSocketID.get(token);
    if (existingSocketID && existingSocketID !== socketID) {
        // Destroy the old connection using this token
        await destroyBot(existingSocketID, io);
    }

    // Destroy any existing bot for this socket before creating a new one
    await destroyBot(socketID, io);

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
    tokenToSocketID.set(token, socketID);
    return bot;
};

const destroyBot = async (socketID, io) => {
    const bot = activatedBots.get(socketID);
    if (bot) {
        // Find and remove the token mapping for this bot
        for (const [token, id] of tokenToSocketID.entries()) {
            if (id === socketID) {
                tokenToSocketID.delete(token);
                break;
            }
        }
        await bot.destroy();
        activatedBots.delete(socketID);

        // Emit status change to the socket if io instance is provided
        if (io) {
            const socket = io.sockets.sockets.get(socketID);
            if (socket) {
                socket.emit("bot:status", { status: "disconnected" });
            }
        }
    }
};

const isBotConnected = (socketID) => {
    const bot = activatedBots.get(socketID);
    return bot && bot.isReady && bot.isReady();
};

const getBot = (socketID) => {
    return activatedBots.get(socketID);
};

export { activatedBots, createBot, destroyBot, isBotConnected, getBot };
