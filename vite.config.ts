import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/api": { // ✅ Все запросы, начинающиеся с "/api" будут проксироваться
        target: "https://47e5-2001-1ae9-2af-3d00-dde-2d3c-7c84-c1f0.ngrok-free.app",
        changeOrigin: true, // ✅ Меняет заголовок Origin на целевой сервер
        secure: false, // ✅ Используется, если сервер HTTPS с self-signed SSL
        rewrite: (path) => path.replace(/^\/api/, ""), // ✅ Убирает "/api" перед отправкой
      },
    },
  },
  base: "/lineup-ui/", // Добавляем базовый путь, соответствующий названию репозитория
});
