import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// dev (211:3080) serves at "/", the production build is served by GitHub Pages at /ai-agent-class/.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/ai-agent-class/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  server: { host: "0.0.0.0", port: 3080, strictPort: true, allowedHosts: true, fs: { allow: [".."] } },
  preview: { host: "0.0.0.0", port: 3080, strictPort: true },
}))
