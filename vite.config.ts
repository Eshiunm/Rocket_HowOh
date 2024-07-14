import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/Rocket_HowOh/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://howoh.rocket-coding.com",
        changeOrigin: true,
      },
    },
  },
});
