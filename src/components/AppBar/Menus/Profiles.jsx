import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useState } from "react";

function Profile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? "profile-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            src="https://p9-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/3bc9ced3ed5ba6604d93ca5976a8e267.jpeg?lk3s=a5d48078&nonce=21332&refresh_token=a5dcfdaa874bbee510d118af45292862&x-expires=1732647600&x-signature=Q0cAGmWy7GBfpEMuUcIDHhbw%2F2s%3D&shp=a5d48078&shcp=81f88b70"
            sx={{ width: 32, height: 32 }}
            alt="hungnguyen"
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="Profiles-positioned-menu"
        aria-labelledby="Profiles-positioned-button"
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
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ width: 27, height: 27, mr: 0.5 }} /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ width: 27, height: 27, mr: 0.5 }} /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Profile;
