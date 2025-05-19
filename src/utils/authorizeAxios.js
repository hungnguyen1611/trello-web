// Khởi tạo một đối tượng Axios (author zedAxiosInstance) mục đích để config và custom chung cho dự án

import axios from "axios";
import { toast } from "react-toastify";
import { interceptorLoadingElements } from "./formatters";
import { logoutUserAPI } from "~/redux/user/userSlice";
import { refreshTokenAPI } from "~/apis";
import { API_ROOT } from "./constants";

/**
 * Không thể import trực tiếp { store } từ '~/redux/store' theo cách thông thường trong file này.
 *
 * ✅ Giải pháp: Sử dụng kỹ thuật "inject store" — cho phép truyền redux store vào các file nằm ngoài phạm vi component,
 * chẳng hạn như file authorizeAxios hiện tại.
 *
 * ✅ Cách hoạt động: Khi ứng dụng khởi động, `main.jsx` là nơi chạy đầu tiên. Tại đó, ta gọi hàm `injectStore`
 * để gán redux store vào một biến cục bộ (`axiosReduxStore`) trong file này, giúp sử dụng được store mà không cần import trực tiếp.
 *
 * 🔗 Tham khảo: https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
 */

let axiosReduxStore;
export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore;
};

let authorizeAxiosInstance = axios.create({
  baseURL: API_ROOT,
});

// Thời gian chờ rối đa của một request: để 10 phút
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10;

// withCredentials: sẽ cho phép Axios tự động gửi cooki trong mỗi request lên BE
// (phục vụ việc chúng ta sẽ lưu JWT tokens (refresh & access)) vào trong httpOnly cookie của trình duyệt
authorizeAxiosInstance.defaults.withCredentials = true;

// Cấu hình interceptor (đánh chặn giữa request và response)

// Add a request interceptor:Can thiệp vào giữa những request API
authorizeAxiosInstance.interceptors.request.use(
  (config) => {
    // Kĩ thuật chặn spam click
    interceptorLoadingElements(true);
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Khởi tạo một Promise để thực hiện việc gọi API refresh_token
// Mục đích: đảm bảo rằng sau khi gọi refresh_token thành công thì mới thực hiện retry lại các request bị lỗi trước đó
// Tham khảo: https://www.thedutchlab.com/en/insights/using-axios-interceptors-for-refreshing-your-api-token

let refreshTokenPromise;
// Add a response interceptor: Can thiệp vào giữa những response nhân về từ API
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this  to trigger
    // Do something with response data
    // Kĩ thuật chặn spam click
    interceptorLoadingElements(false);
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // Mọi mã http status code nằm ngoài khoảng 200 -299 sẽ là error và rơi vào đây
    // Kĩ thuật chặn spam click
    interceptorLoadingElements(false);

    // Xử lí refreshToken tự động
    // Nếu như nhận mã 401 từ backEnd thì gọi api đăng xuất
    if (error?.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUserAPI(false));
    }

    // Nếu như nhận mã 410 từ BE thì gọi refreshToken để làm mới accessToken
    // Đầu tiên lấy được các request API đang bị lỗi thông qua  error.config
    const originalRequests = error.config;
    if (error?.response?.status === 410 && !originalRequests._retry) {
      // Gán thêm giá trị retry là true trong khoảng thời gian chờ để đảm bảo việc refresh token luôn chỉ gọi 1 lần
      // Tại một thời điểm (nhìn lại điều kiện if ngay phía trên)
      originalRequests._retry = true;

      // Kiểm tra xem nếu chưa có việc gán refreshTokenPromise thì thực hiện việc gán api refreshToken đồng thời
      // Gán vào cho cái refreshTokenPromise
      // Ko cần retry cx được vì cx đã có check refreshTokenPromise
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then((data) => {
            return data.accessToken;
          })
          .catch((error) => {
            // Bất kì lỗi gì xảy ra khi refreshToken cũng logout hêt
            axiosReduxStore.dispatch(logoutUserAPI(false));
            return Promise.reject(error);
          })
          .finally(() => {
            // Dù Api có ok hay faild thì vẫn gán lại cái refreshTokenPromise về null như ban đầu
            refreshTokenPromise = null;
          });
      }

      // Xử lý khi refreshTokenPromise resolve thành công
      // eslint-disable-next-line no-unused-vars
      return refreshTokenPromise.then((accessToken) => {
        /**
         * Bước 1: Nếu dự án yêu cầu lưu accessToken vào localStorage hoặc cấu hình vào headers mặc định của axios,
         * bạn có thể thêm đoạn code xử lý tại đây.
         *
         * Ví dụ:
         * axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
         *
         * Tuy nhiên hiện tại không cần bước này vì accessToken đã được đưa vào cookie
         * từ phía BE sau khi gọi API refreshToken thành công.
         */

        // Bước 2: Quan trọng — trả về instance axios kèm originalRequests để gửi lại các request trước đó bị lỗi
        return authorizeAxiosInstance(originalRequests);
      });
    }

    // Xử lí tâp chung phần hiện thị thông báo lỗi trả về từ mọi Api ở đây ( viết code một lần ( clean code))
    let errorMessage = error.message;

    if (error?.response?.data?.message) {
      errorMessage = error?.response?.data?.message;
    }

    // Dùng toastify hiển thị bất kì mã lỗi nào lên màng hình ngoại trừ lỗi 410 - GONE phục vụ việc tự động refresh lại token
    if (error?.response?.status !== 410) {
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);
export default authorizeAxiosInstance;
