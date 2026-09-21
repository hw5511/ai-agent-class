// PM2: the shadcn viewer mockup (web/), dev server on :3080. Not merged into the Pages site.
module.exports = {
  apps: [
    {
      name: "agentclass-web",
      cwd: __dirname,
      script: "node_modules/vite/bin/vite.js",
      args: "--host 0.0.0.0 --port 3080 --strictPort",
      interpreter: "node",
      autorestart: true,
    },
  ],
}
