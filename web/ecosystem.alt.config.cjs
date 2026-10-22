// PM2: second dev server for the alternative automation session-1 practice (branch automation-s1-expense), port 3081.
module.exports = {
  apps: [
    {
      name: "agentclass-web-alt",
      cwd: "C:/wi/projects/lectures/ai-agent-class-expense/web",
      script: "node_modules/vite/bin/vite.js",
      args: "--host 0.0.0.0 --port 3081 --strictPort",
      interpreter: "node",
      autorestart: true,
    },
  ],
}
