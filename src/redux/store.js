import { configureStore } from "@reduxjs/toolkit";
// import { activeBoardReducer } from "./activeBoard/ActiveBoardSlice";
import { activeBoardReducer } from "./activeBoard/activeBoardSlice";
import { userReducer } from "./user/userSlice";

// Cấu hình redux-persist
// https://www.npmjs.com/package/redux-persist
// Bài viết hướng dẫn
// https://edvins.io/how-to-use-redux-persist-with-redux-toolkit
// Lưu ý khi cài @reduxjs/toolkit là có luôn redux
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { activeCardReducer } from "./activeCardSlice/ActiveCardSlice";
import { notificationsReducer } from "./Notifications/NotificationsSlice";

// Cấu hình persist config

const rootPersistConfig = {
  // Key của cái persist do chúng ta chỉ định cứ để mặc đinh là root
  key: "root",

  // Biến store ở trên lưu vào local storage
  storage: storage,

  // Định nghĩa các slice dữ liệu được phép duy trì qua các lần f5 trình duyệt
  whitelist: ["user"],
  // Định nghĩa các slice dữ liệu ko được phép duy trì qua các lần f5 trình duyệt
  // blacklist: ['user']
  // transforms: [saveOnlyNotificationAmount],
};

// Combine các reducer trong dự án ở đây
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  activeCard: activeCardReducer,
  user: userReducer,
  notifications: notificationsReducer,
});

// Persist Reducer
const persistedReducers = persistReducer(rootPersistConfig, reducers);

//  * ✅ Cấu hình Redux Store với redux-persist
//  * - Tắt cảnh báo "non-serializable value" khi sử dụng redux-persist.
//  * 🔗 Tham khảo: https://stackoverflow.com/a/63244831/8324172
//  */

export const store = configureStore({
  // reducer: {
  //   activeBoard: activeBoardReducer,
  //   user: userReducer,
  // },
  reducer: persistedReducers,

  // Fix cảnh báo khi dùng redux-tookit và redeuxpersist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
