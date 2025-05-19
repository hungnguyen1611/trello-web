import { Container } from "@mui/material";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  moveCardToDifferentColumnAPI,
  UpdateBoardDetailAPI,
  UpdateColumnDetailAPI,
} from "~/apis";
import AppBar from "~/components/AppBar";
import { Loading } from "~/components/Loading/Loading";
import {
  fetchBoardDetailAPI,
  selectCurrentActiveBoard,
  updateCurrentActiveBoard,
} from "~/redux/activeBoard/activeBoardSlice";
import BoardBar from "./BoardBar";
import BoardContent from "./BoardContent/BoardContent";

// import { mockData } from "~/apis/mock-data";
function Board() {
  const { boardId } = useParams();
  // const boardId = "68056569f29a7224ad02d540";

  // Không dùng State của compoent nữa
  const board = useSelector(selectCurrentActiveBoard);

  const dispatch = useDispatch();

  // Func gọi api khi kéo thả column xong xuôi

  const moveColumns = (dndOrderedColumns) => {
    // Trường hợp dùng Spread Operator thì ko sao vì ở đây không dùng push làm thay đổi trực tiếp kiểu mở rổng mạng
    // mà chỉ đang gán lại hai giá trị columns và comlumnOrderIds bằng 2 giá trị mảng mới giống như dùng concat()
    const newBoard = { ...board };
    const dndOrderedColumnIds = dndOrderedColumns.map((column) => column._id);
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnIds;
    dispatch(updateCurrentActiveBoard(newBoard));

    //  Không cần await vì không hứng kết quả hay làm gì tiếp sau khi đã gọi
    UpdateBoardDetailAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnIds,
    });
  };

  // Func gọi api khi kéo thả card xong xuôi (Card trong cùng 1 column)

  const moveCardInTheSameColumn = (
    dndOrderedCardId,
    dndOrderedCard,
    columnId
  ) => {
    // Update cho chuẩn dữ liệu State Board
    // Dùng cloneDeep để fix lỗi khi sao chép giá trị của redux
    // Trường hợp Immutability đã đụng tới giá trị cards đang được coi là chỉ đọc read Only(nested Oject - can thiệp sâu dữ liệu)
    const newBoard = cloneDeep(board);
    const updateColumn = newBoard.columns.find(
      (column) => column._id === columnId
    );
    if (updateColumn) {
      updateColumn.cardOrderIds = dndOrderedCardId;
      updateColumn.cards = dndOrderedCard;
    }
    dispatch(updateCurrentActiveBoard(newBoard));
    //  Đổi tên key cho đúng với dữ liệu backEnd (có thể tùy ý đặt tên nếu api có config)
    UpdateColumnDetailAPI(columnId, { cardOrderIds: dndOrderedCardId });
  };
  const moveCardToDifferentColumn = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumn
  ) => {
    const dndOrderedColumnsIds = dndOrderedColumn.map((column) => column._id);
    // Tương tự như moveColumn ở trên vì không làm thay đổi trực tiếp dữ liệu và không  can thiệp dữ liệu sâu ,
    // Nên không ảnh hưởng Redux ToolKit Immutability gì ở đây cả
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumn;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    dispatch(updateCurrentActiveBoard(newBoard));

    // Gọi Api từ BE

    //  Có thể thêm || [] phía sau để tránh lỗi nhưng ko cần đê lỡ khi dữ liệu bị lỗi thì sẽ báo lỗi và ta có thể biết place lỗi mà debug
    let prevCardOrderIds = dndOrderedColumn.find(
      (c) => c._id === prevColumnId
    )?.cardOrderIds;
    // loại bỏ placeholder-card trong mảng với trường hợp prevColumn sau khi kéo ko còn card trước khi gửi lên backEnd
    // Lưu ý: Khi bug card placeholder-card xảy ra sẽ dẫn đến bug tạo column dó ko lấy được boardId
    if (prevCardOrderIds[0].includes("placeholder-card")) prevCardOrderIds = [];

    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumn.find((c) => c._id === nextColumnId)
        ?.cardOrderIds,
    });
  };

  useEffect(() => {
    // Call Api lấy data boardActive
    dispatch(fetchBoardDetailAPI(boardId));
  }, [dispatch, boardId]);

  if (!board || !board.columns) return <Loading caption="Loading Board" />;
  return (
    <>
      <AppBar />
      <Container
        // sx={{ height: "100vh",  }}

        // disableGutters để bở padding 2 bên and mw = false là để full width
        disableGutters
        maxWidth={false}
      >
        <BoardBar board={board} />
        <BoardContent
          board={board}
          // 3 phần dữ nguyên vì xử lí ngay ở BoardContent
          moveColumns={moveColumns}
          moveCardInTheSameColumn={moveCardInTheSameColumn}
          moveCardToDifferentColumn={moveCardToDifferentColumn}
        />
      </Container>
    </>
  );
}

export default Board;
