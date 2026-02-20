import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // permite acessar por IP da rede
    port: 8081       // porta desejada
  }
});