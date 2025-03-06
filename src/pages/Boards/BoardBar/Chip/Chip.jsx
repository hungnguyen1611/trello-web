import { Chip } from "@mui/material";
import PropTypes from "prop-types";

function ChipBoard({ label, clickable, icon }) {
  return (
    <Chip
      icon={icon}
      label={label}
      clickable={clickable}
      sx={{
        color: "white",
        background: "transparent",
        border: "none",
        paddingX: 0.5,
        borderRadius: "4px !important",
        ".MuiSvgIcon-root": {
          color: "white",
        },
        "&:hover": {
          bgcolor: "primary.50",
        },
      }}
    />
  );
}

ChipBoard.propTypes = {
  label: PropTypes.string,
  clickable: PropTypes.bool,
  icon: PropTypes.node,
};
export default ChipBoard;
