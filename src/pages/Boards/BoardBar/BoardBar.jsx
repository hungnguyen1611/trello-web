import {
  AddToDrive,
  Bolt,
  Dashboard,
  FilterList,
  PersonAdd,
  VpnLock,
} from "@mui/icons-material";
import { Avatar, AvatarGroup, Box, Button, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

import ChipBoard from "./Chip";

import { capitalizeFirstLetter } from "~/utils/formatters";
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
        <Button
          startIcon={<PersonAdd />}
          sx={{ color: "white", borderColor: "white" }}
          variant="outlined"
        >
          Invite
        </Button>
        <AvatarGroup
          sx={{
            gap: 1,
            ".MuiAvatar-root": {
              height: 34,
              width: 34,
              fontSize: 16,
              border: "none",
              color: "white",
              cursor: "pointer",
              "&:first-of-type": {
                bgcolor: "#a4b0de",
              },
            },
          }}
          max={3}
          total={20}
        >
          <Tooltip title="hungnguyen">
            <Avatar
              alt="hungnguyen"
              src="https://p9-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/3bc9ced3ed5ba6604d93ca5976a8e267.jpeg?lk3s=a5d48078&nonce=21332&refresh_token=a5dcfdaa874bbee510d118af45292862&x-expires=1732647600&x-signature=Q0cAGmWy7GBfpEMuUcIDHhbw%2F2s%3D&shp=a5d48078&shcp=81f88b70"
            />
          </Tooltip>
          <Tooltip title="mydien">
            <Avatar
              alt="hungnguyen"
              src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/0f250020980395d3abd881f444104290~c5_1080x1080.jpeg?lk3s=a5d48078&nonce=85896&refresh_token=1f8ea454d4830cbf32b2361474802154&x-expires=1733155200&x-signature=DXjE1RFH%2FhRrqO7kp5JrKLoHHhc%3D&shp=a5d48078&shcp=81f88b70"
            />
          </Tooltip>
        </AvatarGroup>
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
