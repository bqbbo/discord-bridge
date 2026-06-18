import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const DEV_PORT = 3001;

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/socket.io": {
                target: `http://localhost:${DEV_PORT}`,
                ws: true,
            },
        },
    },
    build: {
        outDir: "../server/public",
        emptyOutDir: true,
    },
});
