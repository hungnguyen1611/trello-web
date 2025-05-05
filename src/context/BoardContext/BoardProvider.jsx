import {
  createNewCardApi,
  createNewColumnApi,
  fetchBoardDetailAPI,
} from "~/apis";
import BoardContext from "./BoardContext";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { generatePlaceholderCard } from "~/utils/formatters";

export const BoardProvider = ({ children }) => {
  const [board, setBoard] = useState();
  //  cần điều chỉnh dùng react-router-dom để lấy url
  const boardId = "68056569f29a7224ad02d540";

  const createColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnApi({
      ...newColumnData,
      boardId: board._id,
    });

    createColumn.cards = [generatePlaceholderCard(createdColumn)];
    createColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];

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
    const newBoard = { ...board };
    newBoard.columns.push(createdColumn),
      newBoard.columnOrderIds.push(createdColumn._id);
    setBoard(newBoard);
    toast.success("created Column Success");
  };

  const createCard = async (newCardData) => {
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
        columnToUpdate.cards.push(createdCard); // ✅ đẩy card vào
        columnToUpdate.cardOrderIds.push(createdCard._id); // ✅ đẩy id vào
      }

      setBoard(newBoard); // cập nhật lại state

      toast.success("Create Card Success");
    }
  };

  useEffect(() => {
    fetchBoardDetailAPI(boardId).then((board) => {
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        }
      });
      setBoard(board);
    });
  }, []);
  return (
    <BoardContext.Provider value={{ board, createColumn, createCard }}>
      {children}
    </BoardContext.Provider>
  );
};

BoardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
