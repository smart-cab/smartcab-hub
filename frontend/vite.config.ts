import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "node:fs";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: "0.0.0.0",
        hmr: {
            port: 3000,
        },
        port: 3000,
        watch: {
            usePolling: true,
        },
        https: {
            cert: fs.readFileSync("ssl/smartcab.sch1357.ru.crt"),
            key: fs.readFileSync("ssl/device.key"),
        },
    },
});
