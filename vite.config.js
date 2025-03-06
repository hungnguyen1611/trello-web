import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [ svgr(), react()],
  resolve: {
    alias: [
      { find: '~', replacement: '/src' },
    ],
  },
  server: {
    host: true, // Cho phép truy cập bằng địa chỉ IP
    port:3000, // Tùy chọn, có thể thay đổi nếu cần
  },
});

