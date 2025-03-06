import { Box, Button, Stack } from "@mui/material";
import { Column } from "./Column/Column";
import { NoteAdd } from "@mui/icons-material";
import PropTypes from "prop-types";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
export const ListColumns = ({ columns }) => {
  return (
    <SortableContext
      items={columns.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
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

        {/* <Box
          sx={{
            minWidth: "300px",
            maxWidth: "300px",
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
            ml: 2,
            borderRadius: "6px",
            height: "fit-content",
            maxHeight: (theme) =>
              `calc(${theme.trello.boardBarContent} - ${theme.spacing(2)}) `,
          }}
        >
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1,
            }}
          >
            <Typography sx={{ fontWeight: "bold", cursor: "pointer" }}>
              Column Tite
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
          <Stack
            sx={{
              gap: 0.7,
              p: "0 5px",
              m: "0 5px",
              maxHeight: (theme) =>
                `calc(${theme.trello.boardBarContent} - ${theme.spacing(
                  2
                )} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,
              overflowY: "auto",
              overflowX: "hidden",
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ced0da",
                borderRadius: "0.5rem",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#bfc2cf",
              },
            }}
          >
            <Card
              sx={{
                boxShadow: "0 2px 2px rgba(0,0,0,0.2)",
                cursor: "pointer",
                overflow: "unset",
              }}
            >
              <CardMedia
                sx={{ height: 140 }}
                image="https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-desktop-7.jpg"
                title="green iguana"
              />
              <CardContent sx={{ p: 1, "&:last-child": { p: 1 } }}>
                <Typography>hungnguyen</Typography>
              </CardContent>
              <CardActions sx={{ p: "0 4px 8px 4px " }}>
                <Button startIcon={<Group />} size="small">
                  2
                </Button>
                <Button startIcon={<Comment />} size="small">
                  20
                </Button>
                <Button startIcon={<Attachment />} size="small">
                  4
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                boxShadow: "0 2px 2px rgba(0,0,0,0.2)",
                cursor: "pointer",
                overflow: "unset",
              }}
            >
              <CardContent sx={{ p: 1, "&:last-child": { p: 1 } }}>
                <Typography>hungnguyen1</Typography>
              </CardContent>
            </Card>
          </Stack>
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
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
        </Box> */}
      </Stack>
    </SortableContext>
  );
};

ListColumns.propTypes = {
  columns: PropTypes.object,
};
