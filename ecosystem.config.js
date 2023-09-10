module.exports = {
  apps: [
    {
      name: 'onity-front',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3001',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
