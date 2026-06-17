import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { createBot, destroyBot } from "./bot.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
console.log(`Running in ${isProd ? "production" : "development"} mode`);

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    console.log(`User connected: IP ${socket.handshake.address}`);

    socket.on("bot:connect", async (token) => {
        const bot = await createBot(socket.id, token);
        try {
            const client = await createBot(socket.id, token);
            socket.emit("bot:status", {
                status: "connected",
                tag: client.user.tag,
            });
        } catch (error) {
            socket.emit("bot:status", {
                status: "error",
                message: error.message,
            });
        }
    });

    socket.on("disconnect", async () => {
        await destroyBot(socket.id);
        console.log(`User disconnected: IP ${socket.handshake.address}`);
    });
});

if (isProd) {
    app.use(express.static(path.join(__dirname, "../public")));
    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
} else {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
        root: path.join(__dirname, "../../client"),
        server: { middlewareMode: true },
        appType: "spa",
    });
    app.use(vite.middlewares);
}

const PORT =
    isProd ? process.env.DC_BRIDGE_PORT : process.env.DC_BRIDGE_PORT_DEV;
if (!PORT) {
    console.error("Error: PORT environment variable is not set");
    process.exit(1);
}

server.listen(PORT, () => {
    console.log(`Discord Bridge listening on port ${PORT}`);
});
