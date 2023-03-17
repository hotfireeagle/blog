import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import path from "path"

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
    proxy: {
      "/api": "http://127.0.0.1:8000",
    }
  },
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    }
  }
});
