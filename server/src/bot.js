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
        console.error("Failed to login bot:", error);
        return null;
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

export { createBot, destroyBot };
