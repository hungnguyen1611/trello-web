/* eslint-disable react/prop-types */
import {
  AddToDrive,
  Bolt,
  Dashboard,
  FilterList,
  VpnLock,
} from "@mui/icons-material";
import { Box, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

import ChipBoard from "./Chip";

import { capitalizeFirstLetter } from "~/utils/formatters";
import BoardUserGroup from "./BoardUserGroup";
import InviteBoardUser from "./InviteBoardUser";
function BoardBar({ board }) {
  return (
    <Box
      sx={{
        height: (theme) => theme.trello.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflowX: "auto",
        // borderBottom: "solid 1px white",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
      }}
    >
      <Box px={1} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* <Chip
          icon={<Dashboard />}
          label="hungnguyen MERN stack Board"
          clickable
          sx={{
            color: "primary.main",
            background: "white",
            border: "none",
            paddingX: 0.5,
            borderRadius: "4px !important",
            "& .MuiSvgIcon-root": {
              color: "primary.main",
            },
            "&:hover": {
              bgcolor: "primary.50",
            },
          }}
        /> */}
        <Tooltip title={board?.description}>
          {/*  add box to be able to use tooltip */}
          <Box>
            <ChipBoard icon={<Dashboard />} label={board?.title} clickable />
          </Box>
        </Tooltip>
        <ChipBoard
          icon={<VpnLock />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
        <ChipBoard
          icon={<AddToDrive />}
          label="Add To Google Drive"
          clickable
        />
        <ChipBoard icon={<Bolt />} label="Automation" clickable />
        <ChipBoard icon={<FilterList />} label="Filter" clickable />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Xử lí mời user vào làm thành viên của board */}
        <InviteBoardUser boardId={board._id} />
        {/* Xử lí hiện thị danh sách thành viên của Group (dùng của mui khó xử lí hiện thị khi active nên thôi) */}
        <BoardUserGroup boardUsers={board.FE_allUser} />
      </Box>
    </Box>
  );
}

BoardBar.propTypes = {
  board: PropTypes.shape({
    title: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default BoardBar;
