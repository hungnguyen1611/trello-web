// FacebookLoginButton.jsx
import { useEffect } from "react";

const FacebookLoginButton = () => {
  useEffect(() => {
    // Khởi tạo Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "YOUR_APP_ID", // 🔁 Thay bằng App ID của bạn
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });
    };

    // Load SDK script
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleFacebookLogin = () => {
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;

          // Gửi accessToken về server để xác thực
          fetch("http://localhost:5000/api/auth/facebook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accessToken }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Dữ liệu từ server:", data);
              // TODO: lưu token từ backend nếu có
            });
        } else {
          console.log("Người dùng huỷ đăng nhập");
        }
      },
      { scope: "email,public_profile" }
    );
  };

  return <button onClick={handleFacebookLogin}>Đăng nhập bằng Facebook</button>;
};

export default FacebookLoginButton;

// Frontend dùng SDK Facebook → lấy accessToken

// Gửi accessToken sang backend

// Backend dùng accessToken gọi tới Facebook API để xác thực và lấy thông tin người dùng
