import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import authorizeAxiosInstance from "~/utils/authorizeAxios";
import { generatePlaceholderCard } from "~/utils/formatters";
import { mapOrder } from "~/utils/sorts";

// Khởi tạo giá trị của một Slice trong redux
const initialState = {
  currentActiveBoard: null,
};

// Các hành động gọi api (bất đồng bộ), và cập nhật dữ liệu vào Redux,
//  dùng Middleware createAsyncThunk đi kèm với ExtraReducers

export const fetchBoardDetailAPI = createAsyncThunk(
  "activeBoard/fetchBoardDetailAPI",
  async (boardId) => {
    const response = await authorizeAxiosInstance.get(`/v1/boards/${boardId}`);
    return response.data;
  }
);

// Khởi tạo một Slice trong kho lưu trũ - redux store
export const activeBoardSlice = createSlice({
  name: "activeBoard",
  initialState,
  //   Reducers nơi xử lí dũ liệu đồng bộ
  reducers: {
    // Lưu ý: luôn luôn cần cặp ngoặc nhọn bên trong hàm của reducer, dù code chỉ có một dòng
    updateCurrentActiveBoard: (state, action) => {
      // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer, ở đây ta đổi tên để có nghĩa hơn
      const board = action.payload;

      //   Xử lí dữ liệu nếu cần thiết

      //   Update lại dữ liệu currentActiveBoard
      state.currentActiveBoard = board;
    },

    updateCardInBoard: (state, action) => {
      // Updated nested data
      // https://redux-toolkit.js.org/usage/immer-reducers
      const incomingCard = action.payload;

      // Tìm board => column => card
      const column = state.currentActiveBoard.columns.find(
        (column) => column._id === incomingCard.columnId
      );

      if (column) {
        const card = column.cards.find((card) => card._id === incomingCard._id);
        if (card) {
          // card.title = incomingCard.title;
          // card['title'] = incomingCard['title'];

          // Object.keys(incomingCard).forEach((key) => {
          //   card[key] = incomingCard[key];
          // });
          // Object.assign nhanh hơn trong hầu hết trường hợp
          Object.assign(card, incomingCard);
        }
      }
    },
  },
  //   Extra Reducers:Nơi xử lí dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailAPI.fulfilled, (state, action) => {
      // ction.payload ở đây chính là cái response.data trả về ở trên
      let board = action.payload;

      //   Xử lí dữ liệu nếu cần thiết
      // Thành viên trong board sẽ gộp lại thành từ 2 mảng owners và members
      // board.owners.concat đồng thời cũng giúp những owners hiển thị trên đầu danh sách
      board.FE_allUser = board.owners.concat(board.members);

      // Sắp xếp thứ tự column luôn ở đây sau đó mới đưa xuống component con để tránh bug
      board.columns = mapOrder(board.columns, board.columnOrderIds, "_id");
      board.columns.forEach((column) => {
        //  Khi F5 trang web thì cần xử lí kéo thả vào trường hợp column rỗng card
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          // Sắp xếp thứ tự Card luôn ở đây sau đó mới đưa xuống component con để tránh bug
          column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
        }
      });

      //   Update lại dữ liệu currentActiveBoard
      state.currentActiveBoard = board;
    });
  },
});

// Action là nơi dành cho các component bên dưới gọi bằng dispatch để cập nhật dữ liệu thông qua reducer(chạy đồng bộ)
// Action creators are generated for each case reducer function
export const { updateCurrentActiveBoard, updateCardInBoard } =
  activeBoardSlice.actions;

// Selector: là nơi dành cho cách component bên dưới gọi bằng hook useSelector để lấy dữ liệu từ trong kho redux ra sử dụng
export const selectCurrentActiveBoard = (state) => {
  // state.activeBoard ở đây là chấm đến name của slice
  return state.activeBoard.currentActiveBoard;
};
// Lưu ý cái file này tên là activeBoardSlice nhưng chúng ta sẽ export ra một thứ tên là Reducer
// export default activeBoardSlice.reducer;
export const activeBoardReducer = activeBoardSlice.reducer;
