import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentActiveCard: null,
  isShowModalActiveCard: false, // Không dùng activeCard ở bên Board để ẩn hiện nữa vì sẽ dẫn đến lỗi bật lại modal khi dispatch cập nhật state trong redux
};

export const activeCardSlice = createSlice({
  name: "activeCard",
  initialState,
  // Reducers: Nơi xử lý dữ liệu đồng bộ

  // ✅ Lưu ý luôn là ở đây cần cặp ngoặc nhọn cho function trong reducer cho dù code bên trong chỉ có 1 dòng, đây là rule của Redux
  // https://redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state

  reducers: {
    showModalActiveCard: (state) => {
      state.isShowModalActiveCard = true;
    },
    clearAndHideCurrentActiveCard: (state) => {
      state.currentActiveCard = null;
      state.isShowModalActiveCard = false;
    },

    updateCurrentActiveCard: (state, action) => {
      const fullCard = action.payload; // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer, ở đây chúng ta gán nó ra một biến có nghĩa hơn
      // xử lý dữ liệu nếu cần thiết
      // ...
      // ✅ Update lại dữ liệu currentActiveCard trong Redux
      state.currentActiveCard = fullCard;
    },
  },

  // extraReducers xử lí dữ liệu bất đồng bộ
  // eslint-disable-next-line no-unused-vars
  extraReducers: (builder) => {},
});

// // Action creators are generated for each case reducer function
// ✅ Actions: Là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// ✅ Để ý trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer nhé.
export const {
  clearAndHideCurrentActiveCard,
  updateCurrentActiveCard,
  showModalActiveCard,
} = activeCardSlice.actions;

// ✅ Selectors: Là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho redux store ra sử dụng
export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard;
};

export const selectisShowModalActiveCard = (state) => {
  return state.activeCard.isShowModalActiveCard;
};

// ✅ Cái file này tên là activeCardSlice NHƯNG chúng ta sẽ export một thứ tên là Reducer, mọi người lưu ý :D
// export default activeCardSlice.reducer
export const activeCardReducer = activeCardSlice.reducer;
