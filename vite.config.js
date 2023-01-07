import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/activity_system",
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/activity_system/" // note the trailing slash
      : "/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
