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
        target: process.env.VITE_API_URL || "http://localhost:8000/v1",
        changeOrigin: true, // ✅ Меняет заголовок Origin на целевой сервер
        secure: false, // ✅ Используется, если сервер HTTPS с self-signed SSL
        rewrite: (path) => path.replace(/^\/api/, ""), // ✅ Убирает "/api" перед отправкой
      },
    },
  },
  base: "/lineup-ui/", // Добавляем базовый путь, соответствующий названию репозитория
});
