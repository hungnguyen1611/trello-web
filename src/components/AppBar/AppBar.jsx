import {
  Badge,
  Box,
  Button,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ModeSelect from "../ModeSelect";
import AppsIcon from "@mui/icons-material/Apps";
import { TrelloIcon } from "../Icons/Icon";
import WorkSpace from "./Menus/WorkSpaces";
import Recent from "./Menus/Recent";
import Starred from "./Menus/Starred";
import Template from "./Menus/Templates";
import {
  AddToPhotos,
  Close,
  HelpOutline,
  NotificationsNone,
  Search,
} from "@mui/icons-material";
import Profile from "./Menus/Profiles";
import { useState } from "react";

function AppBar() {
  const [searchValue, setSearchValue] = useState();
  return (
    <Box
      sx={{
        height: (theme) => theme.trello.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 10px",
        gap: 2,
        overflowX: "auto",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#2c3e50" : "#1565c0",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <AppsIcon sx={{ color: "white" }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.2 }}>
          <TrelloIcon fontSize="small" sx={{ color: "white" }} />
          <Typography
            variant="span"
            sx={{ fontSize: "1rem", fontWeight: "bold", color: "white" }}
          >
            {" "}
            Trello
          </Typography>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex", gap: 0.2 } }}>
          <WorkSpace />
          <Recent />
          <Starred />
          <Template />

          <Button
            startIcon={<AddToPhotos />}
            sx={{
              color: "white",
              border: "none",
              "&:hover": {
                bgcolor: "transparent",
              },
            }}
            variant="outlined"
          >
            Create
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          maxHeight: "100%",
        }}
      >
        <TextField
          size="small"
          id="outlined-search"
          label="Search..."
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "white" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Close
                    onClick={() => setSearchValue("")}
                    sx={{
                      color: searchValue ? "white" : "transparent",

                      cursor: "pointer",
                    }}
                    fontSize="small"
                  />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            minWidth: "120px",
            maxWidth: "170px",
            "& label": { color: "white" },
            "& input": { color: "white" },

            "& label.Mui-focused": { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
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
        <ModeSelect />
        <Tooltip title="Notification">
          <Badge color="warning" variant="dot">
            <NotificationsNone sx={{ color: "white" }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutline sx={{ color: "white" }} />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  );
}

export default AppBar;
