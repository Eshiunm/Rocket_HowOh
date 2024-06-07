import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/Rocket_HowOh/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://52.140.100.60",
        changeOrigin: true,
      },
    },
  },
});
