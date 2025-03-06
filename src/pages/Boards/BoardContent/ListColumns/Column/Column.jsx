import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AddCard,
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
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { mapOrder } from "~/utils/sorts";
import { ListCards } from "./ListCards/ListCards";

export const Column = ({ column }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const orderedCards = mapOrder(column.cards, column.cardOrderIds, "_id");

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
  };

  return (
    // Phải bọc div ở ngoài vì vấn để chiều cao của column khi kéo thả sẽ gây ra bug flickering
    <div
      ref={setNodeRef}
      style={dndKitColmnStyles}
      {...attributes}
      // {...listeners}
    >
      <Box
        {...listeners}
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
          <Typography sx={{ fontWeight: "bold", cursor: "pointer" }}>
            {column.title}
          </Typography>

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
          >
            <MenuItem>
              <ListItemIcon>
                <AddCard fontSize="small" />
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
            <MenuItem>
              <ListItemIcon>
                <DeleteForever fontSize="small" />
              </ListItemIcon>
              <ListItemText>Remove this column</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
        {/* Board list card */}

        <ListCards cards={orderedCards} />
        {/* Board footer column */}

        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
          }}
        >
          <Button startIcon={<AddCard />}>Add new card</Button>
          <Tooltip title="Drag to move">
            <DragHandle sx={{ cursor: "pointer", color: "primary.main" }} />
          </Tooltip>
        </Box>
      </Box>
    </div>
  );
};

Column.propTypes = {
  column: PropTypes.object,
};
