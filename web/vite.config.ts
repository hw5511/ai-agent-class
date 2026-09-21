import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // "remotion" -> our 4-function motion shim, so the ported ax-site illustrations run without Remotion
    alias: { "@": path.resolve(__dirname, "./src"), remotion: path.resolve(__dirname, "./src/illustrations/motion.ts") },
  },
  server: { host: "0.0.0.0", port: 3080, strictPort: true, allowedHosts: true, fs: { allow: [".."] } },
  preview: { host: "0.0.0.0", port: 3080, strictPort: true },
})
