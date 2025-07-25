import * as jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCurrentUser } from "~/redux/user/userSlice";

const WellCome = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    (() => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        localStorage.setItem("token", token);

        try {
          const decoded = jwt_decode.jwtDecode(token);

          dispatch(updateCurrentUser(decoded));

          navigate("/");
        } catch (err) {
          console.error("Token decode failed", err);
        }
      }
    })();
  }, [dispatch, navigate]);

  // if (!user) return <p>Đang xử lý đăng nhập...</p>;

  // return (
  //   <div>
  //     <h2>Xin chào, {user.name}</h2>
  //     <Box
  //       component="img"
  //       src={user.avatar}
  //       alt="avatar"
  //       width="80"
  //       style={{ borderRadius: "50%" }}
  //     />
  //     <p>Role: {user.role}</p>

  //     <p>Username: {user.username}</p>

  //     <p>Email: {user.email}</p>
  //   </div>
  // );
};

export default WellCome;
