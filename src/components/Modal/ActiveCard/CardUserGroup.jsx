/* eslint-disable react/prop-types */
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentActiveBoard } from "~/redux/activeBoard/activeBoardSlice";
import { CARD_MEMBER_ACTIONS } from "~/utils/constants";
import { mapOrdercardMember } from "~/utils/sorts";

function CardUserGroup({ cardMemberIds = [], onUpdateCardMembers }) {
  /**
   * Xử lý Popover để ẩn hoặc hiện toàn bộ user trên một cái popup, tương tự docs để tham khảo ở đây:
   * https://mui.com/material-ui/react-popover/
   */
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null);
  const isOpenPopover = Boolean(anchorPopoverElement);
  const popoverId = isOpenPopover ? "card-all-users-popover" : undefined;
  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget);
    else setAnchorPopoverElement(null);
  };

  // Mục đích lấy được toàn bộ thông tin của những thành viên của cái board thông qua field FE_USERs
  const board = useSelector(selectCurrentActiveBoard);

  // Vì thành viên card là tập hợp con của thành viên trong board vậy nên sẽ dựa vào mảng board.FE_allUSer và cardmemberIds rồi
  // lấy ra FE_Card member chứa đựng thông tin của user để hiện thị ra bên ngoài
  // const FE_CardMembers = board.FE_allUser.filter((user) =>
  //   cardMemberIds.includes(user._id)
  // );
  // Cách này giúp sắp xếp danh sách theo đúng thứ tự khi được thêm (phần tử được add vào sau thì sẽ hiện thị sau cùng)
  const FE_CardMembers = cardMemberIds.map((i) => {
    return board.FE_allUser.find((user) => user._id === i);
  });

  const handleUpdateMemberCards = (user) => {
    const icomingMemberInfo = {
      userId: user._id,
      action: cardMemberIds.includes(user._id)
        ? CARD_MEMBER_ACTIONS.REMOVE
        : CARD_MEMBER_ACTIONS.ADD,
    };
    onUpdateCardMembers(icomingMemberInfo);
  };

  // Lưu ý ở đây chúng ta không dùng Component AvatarGroup của MUI bởi nó không hỗ trợ tốt trong việc chúng ta cần custom & trigger xử lý phần tử tính toán cuối, đơn giản là cứ dùng Box và CSS - Style đám Avatar cho chuẩn kết hợp tính toán một chút thôi.
  return (
    <Box sx={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
      {/* Hiển thị các user là thành viên của card */}
      {FE_CardMembers.map((user) => (
        <Tooltip title={user.displayName} key={user._id}>
          <Avatar
            sx={{ width: 34, height: 34, cursor: "pointer" }}
            alt={user.displayName}
            src={user?.avatar}
          />
        </Tooltip>
      ))}

      {/* Nút này để mở popover thêm member */}
      <Tooltip title="Add new member">
        <Box
          aria-describedby={popoverId}
          onClick={handleTogglePopover}
          sx={{
            width: 36,
            height: 36,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "600",
            borderRadius: "50%",
            color: (theme) =>
              theme.palette.mode === "dark" ? "#90caf9" : "#172b4d",
            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? "#2f3542"
                : theme.palette.grey[200],
            "&:hover": {
              color: (theme) =>
                theme.palette.mode === "dark" ? "#000000de" : "#0c66e4",
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#90caf9" : "#e9f2ff",
            },
          }}
        >
          <AddIcon fontSize="small" />
        </Box>
      </Tooltip>

      {/* Khi Click vào + ở trên thì sẽ mở popover hiện toàn bộ users trong board để người dùng Click chọn thêm vào card  */}
      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box
          sx={{
            p: 2,
            maxWidth: "260px",
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          {/* Sắp xếp lại danh sách user (user được active sẽ lên trước) */}
          {mapOrdercardMember(board?.FE_allUser, cardMemberIds).map((user) => (
            <Tooltip title={user.displayName} key={user._id}>
              {/* Cách làm Avatar kèm badge icon: https://mui.com/material-ui/react-avatar/#with-badge */}
              <Badge
                sx={{ cursor: "pointer" }}
                overlap="rectangular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  cardMemberIds.includes(user._id) ? (
                    <CheckCircleIcon
                      fontSize="small"
                      sx={{ color: "#27ae60" }}
                    />
                  ) : null
                }
                onClick={() => {
                  handleUpdateMemberCards(user);
                }}
              >
                <Avatar
                  sx={{ width: 34, height: 34 }}
                  alt={user.displayName}
                  src={user.avatar}
                />
              </Badge>
            </Tooltip>
          ))}
        </Box>
      </Popover>
    </Box>
  );
}

export default CardUserGroup;
