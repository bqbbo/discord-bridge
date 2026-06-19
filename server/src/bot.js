import { Client, GatewayIntentBits } from "discord.js";

const activatedBots = new Map(); // socketID -> client's bot instance

const createBot = async (socketID, token) => {
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
        destroyBot(socketID);
        throw error;
    }

    activatedBots.set(socketID, bot);
    return bot;
};

const destroyBot = async (socketID) => {
    const bot = activatedBots.get(socketID);
    if (bot) {
        await bot.destroy();
        activatedBots.delete(socketID);
    }
};

const isBotConnected = (socketID) => {
    const bot = activatedBots.get(socketID);
    return bot && bot.isReady && bot.isReady();
};

const getBot = (socketID) => {
    return activatedBots.get(socketID);
};

export { createBot, destroyBot, isBotConnected, getBot };
