import { AddToPhotos, HelpOutline } from "@mui/icons-material";
import AppsIcon from "@mui/icons-material/Apps";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { TrelloIcon } from "../Icons/Icon";
import ModeSelect from "../ModeSelect";
import Profile from "./Menus/Profiles";
import Recent from "./Menus/Recent";
import Starred from "./Menus/Starred";
import Template from "./Menus/Templates";
import WorkSpace from "./Menus/WorkSpaces";
import Notifications from "./Notifications/Notifications";
import AutoCompleteSearchBoard from "./SearchBoards/AutoCompleteSearchBoard";

function AppBar() {
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Link to={"/boards"}>
          {" "}
          <Tooltip title="App list">
            <AppsIcon sx={{ color: "white", verticalAlign: "middle" }} />
          </Tooltip>
        </Link>
        <Link to={"/"}>
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
        </Link>
        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
              gap: 0.2,
            },
          }}
        >
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
        {/* Component rearch boards nhanh */}
        <AutoCompleteSearchBoard />
        <ModeSelect />
        <Notifications />
        <Tooltip title="Help">
          <HelpOutline sx={{ color: "white" }} />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  );
}

export default AppBar;
