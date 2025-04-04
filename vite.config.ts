import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "src"),
      },
    },
    base: "./", // лучше для HashRouter, особенно в проде
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:8000/v1",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    define: {
      "process.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
      "process.env.VITE_PRIVY_APP_ID": JSON.stringify(env.VITE_PRIVY_APP_ID),
    },
  };
});
