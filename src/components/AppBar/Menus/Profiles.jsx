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
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUserAPI, selectCurrentUser } from "~/redux/user/userSlice";

function Profile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // const ref = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // setAnchorEl(ref.current);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const currentUser = useSelector(selectCurrentUser);
  const confirmLogout = useConfirm();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const { confirmed } = await confirmLogout({
      title: "Log out of your accout?",
      confirmationText: "confirm",
      cancellationText: "cancel",
    });
    if (confirmed) {
      dispatch(logoutUserAPI());
    }
  };

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          // onMouseEnter={handleClick}
          // onMouseLeave={handleClose}
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? "profile-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            src={currentUser?.avatar}
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
        onClick={handleClose}
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
        <Link to={"/settings/account"} style={{ color: "inherit" }}>
          <MenuItem
            sx={{ "&:hover": { color: "success.light" } }}
            onClick={handleClose}
          >
            <Avatar
              sx={{ width: 27, height: 27, mr: 0.5 }}
              alt="hungnguyen"
              src={currentUser?.avatar}
            />{" "}
            Profile
          </MenuItem>
        </Link>

        <Divider sx={{ backgroundColor: "primary.light" }} />
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
        <MenuItem
          sx={{
            "&:hover": {
              color: "warning.dark",
              "& .logout-icon": {
                color: "warning.dark",
              },
            },
          }}
          onClick={handleLogout}
        >
          <ListItemIcon>
            <Logout className="logout-icon" fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Profile;
