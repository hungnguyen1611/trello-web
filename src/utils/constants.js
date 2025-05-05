let apiRoot = "";

if (process.env.BUILD_MODE === "dev") {
  apiRoot = "http://localhost:3003";
}
if (process.env.BUILD_MODE === "production") {
  apiRoot = "https://trello-backend-c8qp.onrender.com";
}
console.log("🚀 ~ apiRoot:", apiRoot);

export const API_ROOT = apiRoot;

// sau này nền dùng import.meta.env cho tiện, dùng process cần cấu hình ở vite config
