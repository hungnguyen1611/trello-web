import { Done, GroupAdd, NotInterested } from "@mui/icons-material";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import {
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "~/hook/useLocalStorage";

import {
  addNotification,
  fetchInvitationsAPI,
  selectCurrentNotifications,
  updateBoardInvitationAPI,
} from "~/redux/Notifications/NotificationsSlice";
import { selectCurrentUser } from "~/redux/user/userSlice";
import { socketIoInstance } from "~/socketClient";

const BOARD_INVITATION_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
};

function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickNotificationIcon = (event) => {
    setAnchorEl(event.currentTarget);
    setNewNotificationAmount(0);
  };

  const navigate = useNavigate();

  // Số lượng thông báo mới lấy từ redux để kiểm tra có thông báo mới hay không nahah

  const [newNotificationAmount, setNewNotificationAmount] = useLocalStorage(
    "newNotificationAmount",
    0
  );

  const currentUser = useSelector(selectCurrentUser);

  const notifications = useSelector(selectCurrentNotifications);

  //  Fetch danh sách các lời mời notifications
  useEffect(() => {
    dispatch(fetchInvitationsAPI());

    //  Tạo một func xử lí khi nhận được sự kiện real-time
    // https://socket.io/how-to/use-with-react

    const onReceiveNewInvitation = (invitation) => {
      // Nếu mà thằng user đăng nhập hiện tại mà chúng ta đang lưu trong redux chính là thằng invitee bản ghi invitation
      if (invitation.inviteeId === currentUser._id) {
        // B1: Thêm bản ghi invitation mới vào trong redux
        dispatch(addNotification(invitation));

        // B2: Cập nhật trạng thái có thông báo đến
        setNewNotificationAmount((prev) => prev + 1);
      }
    };

    // Lắng nghe sự kiện real-time có tên là BE_USER_INVITED_TO_BOARD từ BE
    socketIoInstance.on("BE_USER_INVITED_TO_BOARD", onReceiveNewInvitation);

    // Clean Up even để ngăn chặn việc đăng kí lặp lại sự kiện
    return () => {
      socketIoInstance.off("BE_USER_INVITED_TO_BOARD");
    };
  }, [dispatch, currentUser._id, setNewNotificationAmount]);

  const updateBoardInvitation = (status, invitationId) => {
    dispatch(updateBoardInvitationAPI({ status, invitationId })).then((res) => {
      if (
        res.payload.boardInvitation.status === BOARD_INVITATION_STATUS.ACCEPTED
      ) {
        navigate(`/boards/${res.payload.boardInvitation.boardId}`);
      }
    });
  };

  return (
    <Box>
      <Tooltip title="Notifications">
        <Badge
          // variant="none"
          // variant="dot"
          // variant={newNotification ? "dot" : "none"}
          color="warning"
          badgeContent={newNotificationAmount}
          sx={{ cursor: "pointer" }}
          id="basic-button-open-notification"
          aria-controls={open ? "basic-notification-drop-down" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickNotificationIcon}
        >
          <CircleNotificationsIcon
            sx={{
              // color: 'white'
              // color: "yellow",
              color: newNotificationAmount ? "yellow" : "white",
            }}
          />
        </Badge>
      </Tooltip>

      <Menu
        sx={{ mt: 2 }}
        id="basic-notification-drop-down"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          root: {
            "aria-hidden": open ? "false" : "true", // Kiểm soát aria-hidden
            // inert: open ? undefined : "", // Sử dụng inert khi menu đóng (thuộc html5 nên ko tương thích với một số trình duyệt như safari hay Firefox)
          },
          list: { "aria-labelledby": "button-id" },
        }}
      >
        {/* !notification vì giá trị khởi tạo của notification là null (cần có () để && hoạt động đúng cách) */}
        {(!notifications || notifications.length === 0) && (
          <MenuItem sx={{ minWidth: 200 }}>
            You do not have any new notifications.
          </MenuItem>
        )}

        {/* ? sẽ check notification trước rồi mới . map */}
        {notifications?.map((notification, index) => (
          <Box key={index}>
            <MenuItem
              sx={{
                minWidth: 200,
                maxWidth: 360,
                overflowY: "auto",
              }}
            >
              <Box
                sx={{
                  maxWidth: "100%",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {/* Nội dung của thông báo */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box>
                    <GroupAdd fontSize="small" />
                  </Box>
                  <Box>
                    <strong>{notification.inviter?.displayName}</strong> had
                    invited you to join the board
                    <strong>{notification.board?.title}</strong>
                  </Box>
                </Box>

                {/* Khi Status của thông báo này là PENDING thì sẽ hiện 2 Button */}
                {notification.boardInvitation.status ===
                  BOARD_INVITATION_STATUS.PENDING && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      className="interceptor-loading"
                      type="submit"
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() =>
                        updateBoardInvitation(
                          BOARD_INVITATION_STATUS.ACCEPTED,
                          notification._id
                        )
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      className="interceptor-loading"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() =>
                        updateBoardInvitation(
                          BOARD_INVITATION_STATUS.REJECTED,
                          notification._id
                        )
                      }
                    >
                      Reject
                    </Button>
                  </Box>
                )}

                {/* Khi Status của thông báo này là ACCEPTED hoặc REJECTED thì sẽ hiện thông tin đó lên */}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 1, (khi test để cả 2 nên có gap)
                    justifyContent: "flex-end",
                  }}
                >
                  {notification.boardInvitation.status ===
                    BOARD_INVITATION_STATUS.ACCEPTED && (
                    <Chip
                      icon={<Done />}
                      label="Accepted"
                      color="success"
                      size="small"
                    />
                  )}

                  {notification.boardInvitation.status ===
                    BOARD_INVITATION_STATUS.REJECTED && (
                    <Chip
                      icon={<NotInterested />}
                      label="Rejected"
                      size="small"
                    />
                  )}
                </Box>

                {/* Thời gian của thông báo */}
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="span" sx={{ fontSize: "13px" }}>
                    {moment(notification.createdAt).format("llll")}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            {/* Cái đường kẻ Divider sẽ không cho hiện nếu là phần tử cuối */}
            {index !== notifications.length - 1 && <Divider />}
          </Box>
        ))}
      </Menu>
    </Box>
  );
}

export default Notifications;
