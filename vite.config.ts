import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/Rocket_HowOh/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://98.70.102.116",
        changeOrigin: true,
      },
    },
  },
});
