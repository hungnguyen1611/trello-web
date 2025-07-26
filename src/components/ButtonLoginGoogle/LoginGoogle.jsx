import { Button } from "@mui/material";
import { GoogleIcon } from "../Icons/Icon";
// import { API_ROOT } from "~/utils/constants";

export default function LoginGoogle() {
  const handleLogin = () => {
    // Lưu ý ko được để lộ client  id nếu ko sẽ gây ra lỗi (log id , để id trực tiếp trong code)
    // Các giá trị bên trong phải đc viết ở env

    const clientId = import.meta.env.VITE_CLIENT_ID_GOOGLE;

    const redirectUri = import.meta.env.VITE_REDIRECT_URI_GOOGLE;

    const scope = import.meta.env.VITE_SCOPE_GOOGLE;

    // const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&access_type=offline`;

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    window.location.href = url;
  };
  return (
    <Button
      fullWidth
      sx={{ padding: "10px 20px", mx: "auto", mt: 1 }}
      startIcon={<GoogleIcon />}
      onClick={handleLogin}
    >
      LoginGoogle
    </Button>
  );
}
