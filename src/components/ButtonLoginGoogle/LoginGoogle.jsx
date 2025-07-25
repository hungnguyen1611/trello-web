import { Button } from "@mui/material";
import { GoogleIcon } from "../Icons/Icon";
import { API_ROOT } from "~/utils/constants";

export default function LoginGoogle() {
  const handleLogin = () => {
    const clientId = import.meta.env.CLIENT_ID_GOOGLE;

    const redirectUri = `${API_ROOT}/v1/users/login_google`;

    const scope = "openid email profile";

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
