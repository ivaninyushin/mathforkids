import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log("Starting vite in mode: " + mode);
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };


  return {
   
    build: {
      outDir: "./build",
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: "index.html",
        },
      },
    },

    plugins: [react(), svgr()]
  };
});
