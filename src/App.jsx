/* eslint-disable react/prop-types */

import { lazy, Suspense } from "react";

import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { selectCurrentUser } from "~/redux/user/userSlice";
import NotFound from "./pages/404/NotFound";
import Auth from "./pages/Auth";
import AccountVerification from "./pages/Auth/AccountVerification";
import Boards from "./pages/Boards";
import Board from "./pages/Boards/Board";
import Home from "./pages/Home/Home";
// import Settings from "./pages/Settings/Settings";
const Settings = lazy(() => import("./pages/Settings/Settings"));
import Templates from "./pages/Templates/Templates";
// import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = ({ user }) => {
  // const { loginWithRedirect } = useAuth0();
  if (!user) {
    return <Navigate to={"/login"} replace={true} />;
    // Sử dụng Auth0
    // loginWithRedirect();
    // return null; return là ko cần thiết vì khi chuyển hướng sang nới khác nó sẽ tự động dừng các hoạt động tại component này
  }
  return <Outlet />;
};

function App() {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Redirect Route   */}
        <Route
          path="/"
          element={
            // replace='true để nó thay thế route / có thể hiểu là route / sẽ không còn nằm trong
            // history của Browser nữa
            // Thực hành bằng cách dễ hiểu hơn bằng cách nhấn Go home từ trang 404 xong quay lại bằng nút
            // back của trình duyệt giứa 2 trường hợp có replace hoặc không có
            // 'boards' ko / trình duyệt cx sẽ tự động hiểu
            <Navigate to="/boards" replace={true} />
          }
        />

        {/*
         * ✅ Giải pháp Clean Code để kiểm soát quyền truy cập vào các route yêu cầu đăng nhập.
         *
         * - Sử dụng `<Outlet />` từ thư viện `react-router-dom` để hiển thị các route con (Child Routes).
         * - Áp dụng để phân biệt các route công khai và các route cần xác thực (Private Routes).
         *
         * 🔗 Tài liệu tham khảo:
         * - React Router - Outlet: https://reactrouter.com/en/main/components/outlet
         * - Hướng dẫn chi tiết về Private Routes: https://www.robinwieruch.de/react-router-private-routes/
         */}

        {/* ProtectedRoute hiểu đơn giản là những route chỉ cho truy cập sau khi đã login */}
        <Route element={<ProtectedRoute user={currentUser} />}>
          {/* Outlet của react-router-dom sẽ chạy vào các child trong này */}
          <Route path="/home" element={<Home />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/boards/:boardId" element={<Board />} />
          <Route path="/settings/account" element={<Settings />} />
          <Route path="/settings/security" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/account/verification" element={<AccountVerification />} />
      </Routes>
    </Suspense>
  );
}

export default App;
