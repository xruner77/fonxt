import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function mpaDevPlugin(): Plugin {
  return {
    name: 'mpa-dev-plugin',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url || '';
        // 若在开发环境下访问独立 HTML 或子目录路由（如 /services.html 或 /case/xxx.html）
        // 且非 Vite 源码与静态模块请求，则回退由 index.html 驱动前端路由与 HMR
        if (
          !url.startsWith('/@') &&
          !url.startsWith('/src') &&
          !url.startsWith('/assets') &&
          !url.startsWith('/node_modules') &&
          (url.endsWith('.html') || !url.includes('.'))
        ) {
          req.url = '/index.html';
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), mpaDevPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false,
  },
});
