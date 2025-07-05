// TrungQuanDev: https://youtube.com/@trungquandev
import { Navigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "~/redux/user/userSlice";
// import { useAuth0 } from "@auth0/auth0-react";

function Auth() {
  // const { loginWithRedirect, isAuthenticated } = useAuth0();

  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";
  const currentUser = useSelector(selectCurrentUser);

  if (currentUser) {
    return <Navigate to={"/"} replace={true} />;
  }

  // if (!isAuthenticated) {
  //   // loginWithRedirect({ appState: { returnTo: '/dashboard' } }) nếu cần chuyển đến trang cụ thể (dự án này đã được xử lý ở Route in APP.jsx)
  //   loginWithRedirect();
  // }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "flex-start",
        background: 'url("src/assets/auth/login-register-bg.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.2)",
      }}
    >
      {isLogin && <LoginForm />}
      {isRegister && <RegisterForm />}
    </Box>
  );
}

export default Auth;
