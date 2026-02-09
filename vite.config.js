import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: "192.168.0.147", //abhishek
//     port: 3000,
//   },
//   optimizeDeps: {
//     exclude: ["@reduxjs/toolkit"],
//   },
// });

// https://vite.dev/config/
// export default defineConfig({
//   base: "./", // ← add this
//   plugins: [react()],
//   server: {
//     host: "0.0.0.0",
//     port: 4000,
//   },
//   optimizeDeps: {
//     exclude: ["@reduxjs/toolkit"],
//   },
// });

export default defineConfig({
  base: "/", // ✅ ABSOLUTE PATH! Works with BrowserRouter
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 4000,
  },
  optimizeDeps: {
    exclude: ["@reduxjs/toolkit"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist", // output folder for build
  },
});
