import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { verifyUserAPI } from "~/apis";
import { Loading } from "~/components/Loading/Loading";

function AccountVerification() {
  // Lấy giá trị email & token từ url

  let [searchParams] = useSearchParams();

  //   const email = searchParams.get("email");
  //   const token = searchParams.get("token");

  const { email, token } = Object.fromEntries([...searchParams]);

  //   Tạo một biến để biết được đã verifi tài khoản hay chưa

  const [verified, setVerified] = useState(false);

  //   Gọi Api để verify tài khoản

  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => setVerified(true));
    }
  }, [email, token]);

  // Nếu url có vấn đề hay không tồn tại email hoặc token thì đá ra trang 404 luôn

  if (!email || !token) return <Navigate to="/404" />;

  //   Nếu chưa verify xong thì hiện loading

  if (!verified) {
    return <Loading caption="Verify your account ..." />;
  }

  // Nếu không gặp vấn để gì và verify thành công thì điều hướng về trang login cùng giá trị verifiedEmail

  return <Navigate to={`/login?verifiedEmail=${email}`} />;
}

export default AccountVerification;
