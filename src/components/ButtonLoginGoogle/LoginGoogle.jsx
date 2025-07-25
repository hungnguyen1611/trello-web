import { Button } from "@mui/material";
import { GoogleIcon } from "../Icons/Icon";

export default function LoginGoogle() {
  const handleLogin = () => {
    const clientId =
      "373355810712-3550a9gvv5j5po8svso8aadl2b7k3e8h.apps.googleusercontent.com";

    const redirectUri = "http://localhost:5000/v1/users/login_google";

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
