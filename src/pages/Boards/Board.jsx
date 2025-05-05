import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createNewCardApi,
  createNewColumnApi,
  deleteColumnDetailAPI,
  fetchBoardDetailAPI,
  moveCardToDifferentColumnAPI,
  UpdateBoardDetailAPI,
  UpdateColumnDetailAPI,
} from "~/apis";
import AppBar from "~/components/AppBar";
import { generatePlaceholderCard } from "~/utils/formatters";
import BoardBar from "./BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { mapOrder } from "~/utils/sorts";
// import { mockData } from "~/apis/mock-data";
function Board() {
  const [board, setBoard] = useState({});
  //  cần điều chỉnh dùng react-router-dom để lấy url
  const boardId = "68056569f29a7224ad02d540";

  const createColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnApi({
      ...newColumnData,
      boardId: board._id,
    });

    // method 1

    // if (createdColumn) {
    //   setBoard((boardPrev) => ({
    //     ...boardPrev,
    //     columns: [...boardPrev.columns, createdColumn],
    //     columnIds: [...boardPrev.columnIds, createdColumn._id],
    //   }));
    //   toast.success("Created Column Success");
    // }
    // method 2

    //  Tùy đặc thù dự án backEnd có nới backEnd trả về toàn bộ dataBoard luôn lúc này thì frontEnd sẽ nhàn hơn
    if (createdColumn) {
      createdColumn.cards = [generatePlaceholderCard(createdColumn)];
      createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];
      const newBoard = { ...board };
      newBoard.columns.push(createdColumn),
        newBoard.columnOrderIds.push(createdColumn._id);
      setBoard(newBoard);
      toast.success("created Column Success");
    }
  };

  const createCard = async (newCardData) => {
    console.log("boardId in createCard", board._id);
    const createdCard = await createNewCardApi({
      ...newCardData,
      boardId: board._id,
    });

    if (createdCard) {
      // Method 1
      // setBoard((boardPrev) => {
      //   const columnUpdata = boardPrev.columns.map((column) => {
      //     if (column._id === createdCard.columnId) {
      //       return { ...column, cards: [...column.cards, createdCard] };
      //     }
      //     return column;
      //   });

      //   return { ...boardPrev, columns: columnUpdata };
      // });

      //   Method 2

      const newBoard = { ...board }; // clone nông
      const columnToUpdate = newBoard.columns.find(
        (column) => column._id === createdCard.columnId
      );

      if (columnToUpdate) {
        // Xử lí column khi đang rỗng chứ placeholdeCard
        if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
          columnToUpdate.cards = [createdCard];
          columnToUpdate.cardOrderIds = [createdCard._id];
        } else {
          columnToUpdate.cards.push(createdCard); // ✅ đẩy card vào
          columnToUpdate.cardOrderIds.push(createdCard._id); // ✅ đẩy id vào
        }
      }

      setBoard(newBoard); // cập nhật lại state

      toast.success("Create Card Success");
    }
  };

  // Func gọi api khi kéo thả column xong xuôi

  const moveColumns = (dndOrderedColumns) => {
    // cập nhật để board đồng bộ ( có thể không cần vẫn không vẫn đề  )
    const newBoard = { ...board };
    const dndOrderedColumnIds = dndOrderedColumns.map((column) => column._id);
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnIds;
    setBoard(newBoard);

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
    const newBoard = { ...board };
    const updateColumn = newBoard.columns.find(
      (column) => column._id === columnId
    );
    if (updateColumn) {
      updateColumn.cardOrderIds = dndOrderedCardId;
      updateColumn.cards = dndOrderedCard;
    }
    setBoard(newBoard);
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
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumn;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

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

  const deleteColumnDetails = (columnId) => {
    setBoard((prevBoard) => ({
      ...prevBoard,
      columns: prevBoard.columns.filter((c) => c._id !== columnId),
      columnOrderIds: prevBoard.columnOrderIds.filter(
        (_id) => _id !== columnId
      ),
    }));
    deleteColumnDetailAPI(columnId).then((res) => {
      toast.success(res?.resultDelete);
    });
  };

  useEffect(() => {
    fetchBoardDetailAPI(boardId).then((board) => {
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
      setBoard(board);
    });
  }, []);

  if (!board || !board.columns)
    return (
      <Box
        sx={{
          height: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CircularProgress disableShrink />
        <Typography>Loading Board ...</Typography>
      </Box>
    );
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
          createColumn={createColumn}
          createCard={createCard}
          moveColumns={moveColumns}
          moveCardInTheSameColumn={moveCardInTheSameColumn}
          moveCardToDifferentColumn={moveCardToDifferentColumn}
          deleteColumnDetails={deleteColumnDetails}
        />
      </Container>
    </>
  );
}

export default Board;
