/* eslint-disable react/prop-types */
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { Box, Divider, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import SidebarCreateBoardModal from "~/pages/Boards/create";

const SidebarItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: "12px 16px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark" ? "#33485D" : theme.palette.grey[300],
  },
  "&.active": {
    color: theme.palette.mode === "dark" ? "#90caf9" : "#0c66e4",
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#e9f2ff",
  },
}));

export default function SideBar() {
  return (
    <>
      <Stack spacing={1}>
        <SidebarItem component={NavLink} to="/boards">
          <SpaceDashboardIcon fontSize="small" />
          Boards
        </SidebarItem>

        <SidebarItem component={NavLink} to="/templates">
          <ListAltIcon fontSize="small" />
          Templates
        </SidebarItem>
        <SidebarItem component={NavLink} to="/home">
          <HomeIcon fontSize="small" />
          Home
        </SidebarItem>

        <Divider />

        <Box display={{ xs: "block", md: "none" }}>
          <SidebarCreateBoardModal />
        </Box>
      </Stack>
    </>
  );
}
