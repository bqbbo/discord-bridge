import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { initSocket } from "./socket.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
console.log(`Running in ${isProd ? "production" : "development"} mode`);

// Determine ports early so we can pass the dev port into Vite's HMR config
const PORT_STR =
    isProd ? process.env.DC_BRIDGE_PORT : process.env.DC_BRIDGE_PORT_DEV;
if (!PORT_STR) {
    console.error("Error: PORT environment variable is not set");
    process.exit(1);
}
const PORT = Number(PORT_STR);

const app = express();
const server = createServer(app);
const io = new Server(server);

if (isProd) {
    app.use(express.static(path.join(__dirname, "../public")));
    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
} else {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
        root: path.join(__dirname, "../../client"),
        server: {
            middlewareMode: true,
            // Disable HMR since Vite middleware mode doesn't support websocket upgrades
            // Client will do full page refresh on code changes instead
            hmr: false,
        },
        appType: "spa",
    });
    app.use(vite.middlewares);
}

initSocket(io);

server.listen(PORT, () => {
    console.log(`Discord Bridge listening on port ${PORT}`);
});
