import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
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
        proxy: {
            "/api": {
                target: "https://backend:5000",
                changeOrigin: false,
                secure: false,
            },
        },
    },
});
