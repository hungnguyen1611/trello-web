import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  define: {
    //  Cấu hình cho phép dùng process.env
    // eslint-disable-next-line no-undef
    "process.env": process.env,
  },
  plugins: [
    svgr({
      exportAsDefault: false, // 👈 phải có dòng này để dùng ReactComponent
      svgrOptions: {
        exportType: "named", // 👈 để dùng { ReactComponent as ... }
      },
    }),
    react(),
  ],
  resolve: {
    alias: [{ find: "~", replacement: "/src" }],
  },
  server: {
    host: true, // Cho phép truy cập bằng địa chỉ IP
    port: 3000, // Tùy chọn, có thể thay đổi nếu cần
  },
});
