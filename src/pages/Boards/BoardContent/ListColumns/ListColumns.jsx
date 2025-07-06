import { SortableContext } from "@dnd-kit/sortable";
import { Close, NoteAdd } from "@mui/icons-material";
import { Box, Button, Stack, TextField } from "@mui/material";
import { cloneDeep } from "lodash";
import PropTypes from "prop-types";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createNewColumnApi } from "~/apis";
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard,
} from "~/redux/activeBoard/activeBoardSlice";
import { generatePlaceholderCard } from "~/utils/formatters";
import Column from "./Column/Column";
export const ListColumns = memo(({ columns }) => {
  const dispatch = useDispatch();
  const board = useSelector(selectCurrentActiveBoard);
  const [openNewColumn, setOpenNewColoumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const toggleOpenNewColumn = () => setOpenNewColoumn(!openNewColumn);

  const addNewColumn = async () => {
    if (!newColumnTitle)
      return toast.error("Please enter Column Title", { theme: "colored" });

    const newColumnData = {
      title: newColumnTitle.trim(),
    };
    // await createColumn(addNewColumn);

    // Call Api

    const createdColumn = await createNewColumnApi({
      ...newColumnData,
      boardId: board._id,
    });

    //  Tùy đặc thù dự án backEnd có nới backEnd trả về toàn bộ dataBoard luôn lúc này thì frontEnd sẽ nhàn hơn
    if (createdColumn) {
      createdColumn.cards = [generatePlaceholderCard(createdColumn)];
      createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];
      // const newBoard = { ...board };
      // Dùng cloneDeep để tránh lỗi trong redux về vấn để sao chép dữ liệu
      // hoặc có thể dùng concat vì concat sẽ trả về mảng mới
      // VD: newBoard.columnOrderIds = newBoard.columns.concat([createdColumn])
      // Push thay đổi trực tiếp giá trị của mảng, concat ghép mảng và tạo ra một mảng mới nên ko vấn đề
      const newBoard = cloneDeep(board);
      newBoard.columns.push(createdColumn),
        newBoard.columnOrderIds.push(createdColumn._id);

      dispatch(updateCurrentActiveBoard(newBoard));

      toast.success("Created Column Success!");
    }

    // Đóng trạng thái cập nhật column và clear input
    setNewColumnTitle("");
    toggleOpenNewColumn();
  };

  return (
    <SortableContext
      items={columns.map((c) => c._id)}
      // strategy={horizontalListSortingStrategy}
    >
      <Stack
        direction="row"
        sx={{
          height: "100%",
          width: "100%",
          bgcolor: "inherit",
          overflowX: "auto",
          overflowY: "hidden",
          "&::-webkit-scrollbar-track": {
            mx: 2,
          },
        }}
      >
        {columns?.map((column) => (
          <Column column={column} key={column._id} />
        ))}

        {!openNewColumn ? (
          <Box
            sx={{
              height: "fit-content",
              bgcolor: "#ffffff3d",
              mx: 2,
              minWidth: "200px",
              maxWidth: "200px",
              borderRadius: "6px",
            }}
          >
            <Button
              className="interceptor-loading"
              onClick={toggleOpenNewColumn}
              startIcon={<NoteAdd />}
              sx={{
                color: "white",
                justifyContent: "flex-start",
                width: "100%",
                pl: 1.5,
                py: 1,
              }}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              height: "fit-content",
              bgcolor: "#ffffff3d",
              mx: 2,
              minWidth: "200px",
              maxWidth: "200px",
              borderRadius: "6px",
              mt: 1,
            }}
          >
            <TextField
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              autoFocus
              size="small"
              id="outlined-add-column"
              label="Add New Column"
              type="text"
              sx={{
                width: "100%",
                "& label": { color: "white" },

                "& input": { color: "white", paddingY: 1 },

                "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                    // border: "0px",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 0.5,
              }}
            >
              <Button
                className="interceptor-loading"
                onClick={addNewColumn}
                sx={{ color: "white" }}
              >
                Add New
              </Button>
              <Close
                sx={{ color: "white", mr: 1 }}
                onClick={toggleOpenNewColumn}
                fontSize="small"
              />
            </Box>
          </Box>
        )}
      </Stack>
    </SortableContext>
  );
});

ListColumns.displayName = "ListColumns"; // debug in dev tool
ListColumns.propTypes = {
  columns: PropTypes.array,
  createColumn: PropTypes.func,
  createCard: PropTypes.func,
  deleteColumnDetails: PropTypes.func,
};
