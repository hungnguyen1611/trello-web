import { SortableContext } from "@dnd-kit/sortable";
import { Close, NoteAdd } from "@mui/icons-material";
import { Box, Button, Stack, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import { Column } from "./Column/Column";
export const ListColumns = ({
  columns,
  createColumn,
  createCard,
  deleteColumnDetails,
}) => {
  const [openNewColumn, setOpenNewColoumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const toggleOpenNewColumn = () => setOpenNewColoumn(!openNewColumn);

  const addNewColumn = async () => {
    if (!newColumnTitle)
      return toast.error("Please enter Column Title", { theme: "colored" });

    const addNewColumn = {
      title: newColumnTitle.trim(),
    };
    await createColumn(addNewColumn);

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
          <Column
            column={column}
            createCard={createCard}
            key={column._id}
            deleteColumnDetails={deleteColumnDetails}
          />
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
              <Button onClick={addNewColumn} sx={{ color: "white" }}>
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
};

ListColumns.propTypes = {
  columns: PropTypes.array,
  createColumn: PropTypes.func,
  createCard: PropTypes.func,
  deleteColumnDetails: PropTypes.func,
};
