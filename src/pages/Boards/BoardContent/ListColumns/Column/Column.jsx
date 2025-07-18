import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AddCard,
  Close,
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
  DeleteForever,
  DragHandle,
  ExpandMore,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { cloneDeep } from "lodash";
import { useConfirm } from "material-ui-confirm";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  createNewCardApi,
  deleteColumnDetailAPI,
  UpdateColumnDetailAPI,
} from "~/apis";
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard,
} from "~/redux/activeBoard/activeBoardSlice";

import { useDispatch, useSelector } from "react-redux";
import ToggleFocusInput from "~/components/Form/ToggleFocusInput";
import { ListCards } from "./ListCards/ListCards";
function Column({ column }) {
  const board = useSelector(selectCurrentActiveBoard);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const confirmDeleteColumn = useConfirm();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onUpdateColumnTile = (newTitle) => {
    UpdateColumnDetailAPI(column._id, { title: newTitle }).then((res) => {
      const newBoard = cloneDeep(board);
      const updateColumn = newBoard.columns.find((c) => c._id === column._id);
      if (updateColumn) {
        // updateColumn.title = newTitle;
        updateColumn.title = res.title;
      }
      dispatch(updateCurrentActiveBoard(newBoard));
    });
  };

  const handleDeleteColumn = async () => {
    const { confirmed } = await confirmDeleteColumn({
      title: "Delete Column ?",
      description:
        "This action will permanent delete your Column and its Card! Are you sure? Please Enter OK",
      confirmationText: "Confirm",

      // allowClose: false,
      // dialogProps: {
      //   maxWidth: "xs",
      // },
      // cancellationButtonProps: {
      //   color: "secondary",
      // },
      // confirmationButtonProps: {
      //   color: "success",
      // },
      // confirmationKeyword: "OK",
      // buttonOrder: ["cancel", "confirm"],
    });

    if (confirmed) {
      // deleteColumnDetails(column._id);
      // Tương tự như moveColumn ở trên vì không làm thay đổi trực tiếp dữ liệu và không  can thiệp dữ liệu sâu ,
      // Nên không ảnh hưởng Redux ToolKit Immutability gì ở đây cả
      const newBoard = { ...board };
      newBoard.columns = newBoard.columns.filter((c) => c._id !== column._id);
      (newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
        (_id) => _id !== column._id
      )),
        dispatch(updateCurrentActiveBoard(newBoard));

      // setBoard((prevBoard) => ({
      //   ...prevBoard,
      //   columns: prevBoard.columns.filter((c) => c._id !== column._id),
      //   columnOrderIds: prevBoard.columnOrderIds.filter(
      //     (_id) => _id !== column._id
      //   ),
      // }));
      deleteColumnDetailAPI(column._id).then((res) => {
        toast.success(res?.resultDelete);
      });
    }
  };
  // const orderedCards = mapOrder(column.cards, column.cardOrderIds, "_id");
  //  Set column.cards luôn ở đây vì đã sửa lại sắp xếp ở trên board luôn để fix bug (bug tìm sai index của card)
  const orderedCards = column.cards;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column._id, data: { ...column } });

  const dndKitColmnStyles = {
    // touchAction: "none",  dành cho kéo thả bằng touch
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : undefined,
    // tránh bug không có transform
    height: "fit-content",
  };

  const [openNewCard, setOpenNewColoumn] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  const toggleOpenNewCard = () => setOpenNewColoumn(!openNewCard);

  const addNewCard = async () => {
    if (!newCardTitle)
      return toast.error("Please enter Card Title!", {
        position: "bottom-right",
      });

    const newCardData = {
      title: newCardTitle.trim(),
      columnId: column._id,
    };

    // await createCard(dataNewCard);
    // Call Api và update Data
    const createdCard = await createNewCardApi({
      ...newCardData,
      boardId: board._id,
    });

    if (createdCard) {
      // Dùng cloneDeep để fix lỗi khi sao chép giá trị của redux
      const newBoard = cloneDeep(board);
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

      dispatch(updateCurrentActiveBoard(newBoard));

      toast.success("Create Card Success!");
    }

    // Đóng trạng thái cập nhật Card và clear input
    setNewCardTitle("");
    toggleOpenNewCard();
  };

  return (
    // Phải bọc div ở ngoài vì vấn để chiều cao của column khi kéo thả sẽ gây ra bug flickering
    <div
      ref={setNodeRef}
      {...attributes}
      style={dndKitColmnStyles}
      // {...listeners}
    >
      <Box
        {...listeners}
        // {...attributes}
        // ref={setNodeRef}
        sx={{
          minWidth: "300px",
          maxWidth: "300px",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
          ml: 2,
          borderRadius: "6px",
          height: "fit-content",
          maxHeight: (theme) =>
            `calc(${theme.trello.boardBarContent} - ${theme.spacing(3.5)}) `,
        }}
      >
        {/* Board header column */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
          }}
        >
          {/* <Typography sx={{ fontWeight: "bold", cursor: "pointer" }}>
            {column.title}
          </Typography> */}

          <ToggleFocusInput
            //  fixbug kéo vào input (thêm data-no-dnd để ko cho phần tử thực hiện kéo thả)
            data-no-dnd="true"
            value={column.title}
            onChangedValue={onUpdateColumnTile}
          />

          <Tooltip title="More options">
            <ExpandMore
              id="basic-column-drop-dow"
              aria-controls={open ? "dropdown-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "primary.main" }}
            />
          </Tooltip>
          <Menu
            onClick={handleClose}
            id="dropdown-positioned-menu"
            aria-labelledby="basic-column-dropdown"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{
              mt: 0.4, // Tăng khoảng cách trên (margin-top)
            }}
            slotProps={{
              root: {
                "aria-hidden": open ? "false" : "true", // Kiểm soát aria-hidden (fix cảnh warning)
                // inert: open ? undefined : "", // Sử dụng inert khi menu đóng (thuộc html5 nên ko tương thích với một số trình duyệt như safari hay Firefox)
              },
            }}
          >
            <MenuItem
              onClick={toggleOpenNewCard}
              sx={{
                "&:hover": {
                  color: "success.light",
                  "& .add-forever-icon": {
                    color: "success.light",
                  },
                },
              }}
            >
              <ListItemIcon>
                <AddCard className="add-forever-icon" fontSize="small" />
              </ListItemIcon>
              <ListItemText>Add new card</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCut fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cut</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCopy fontSize="small" />
              </ListItemIcon>
              <ListItemText>Coppy</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentPaste fontSize="small" />
              </ListItemIcon>
              <ListItemText>Past</ListItemText>
            </MenuItem>

            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Cloud fontSize="small" />
              </ListItemIcon>
              <ListItemText>Archive this column</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={handleDeleteColumn}
              sx={{
                "&:hover": {
                  color: "warning.dark",
                  "& .delete-forever-icon": {
                    color: "warning.dark",
                  },
                },
              }}
            >
              <ListItemIcon>
                <DeleteForever
                  className="delete-forever-icon"
                  fontSize="small"
                />
              </ListItemIcon>
              <ListItemText>Delete this column</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
        {/* Board list card */}

        <ListCards cards={orderedCards} />
        {/* Board footer column */}

        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,

            px: 1,
            paddingTop: 0.5,
          }}
        >
          {!openNewCard ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button onClick={toggleOpenNewCard} startIcon={<AddCard />}>
                Add new card
              </Button>
              <Tooltip title="Drag to move">
                <DragHandle sx={{ cursor: "pointer", color: "primary.main" }} />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                height: "fit-content",
              }}
            >
              <TextField
                onChange={(e) => setNewCardTitle(e.target.value)}
                autoFocus
                //  fixbug kéo vào input (thêm data-no-dnd để ko cho phần tử thực hiện kéo thả)
                data-no-dnd="true"
                value={newCardTitle}
                variant="outlined"
                label="Add New Card"
                type="text"
                //  size còn giúp lable căn giữa , nêu không có sẽ bị lệch
                size="small"
                sx={{
                  height: "100%",
                  width: "100%",
                  "& label": { color: "primary.main" },

                  "& input": {
                    color: "primary.main",
                    paddingY: 1,
                  },

                  "& label.Mui-focused": { color: "primary.main" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "primary.main",
                      // border: "0px",
                    },
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                }}
              />

              <Box sx={{ display: "flex" }}>
                <Button className="interceptor-loading" onClick={addNewCard}>
                  Add
                </Button>
                <IconButton
                  size="small"
                  aria-label="close"
                  // color="white"
                  onClick={toggleOpenNewCard}
                  // sx={{
                  //   "&:hover": {
                  //     bgcolor: "transparent",
                  //   },
                  // }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}
export default Column;
// export default React.memo(Column); Do ảnh hưởng bởi dnd toolkit cần render liên tục  nên component luôn render nên ko cần dùng React.memo

Column.propTypes = {
  column: PropTypes.object.isRequired,
  createCard: PropTypes.func,
  deleteColumnDetails: PropTypes.func,
};
