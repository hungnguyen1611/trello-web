/* eslint-disable react/prop-types */
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Board from "./pages/Boards";
import NotFound from "./pages/404/NotFound";
import Auth from "./pages/Auth";
import AccountVerification from "./pages/Auth/AccountVerification";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "~/redux/user/userSlice";

const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return <Outlet />;
};

function App() {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <Routes>
      {/* Redirect Route   */}
      <Route
        path="/"
        element={
          // replace='true để nó thay thế route / có thể hiểu là route / sẽ không còn nằm trong
          // history của Browser nữa
          // Thực hành bằng cách dễ hiểu hơn bằng cách nhấn Go home từ trang 404 xong quay lại bằng nút
          // back của trình duyệt giứa 2 trường hợp có replace hoặc không có
          <Navigate to="boards/68056569f29a7224ad02d540" replace={true} />
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
        <Route path="/boards/:boardId" element={<Board />} />
      </Route>

      <Route path="*" element={<NotFound />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/account/verification" element={<AccountVerification />} />
    </Routes>
  );
}

export default App;
