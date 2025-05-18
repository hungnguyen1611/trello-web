import { Box, CircularProgress, Typography } from "@mui/material";
import PropTypes from "prop-types";
export const Loading = ({ caption }) => {
  return (
    <Box
      sx={{
        height: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <CircularProgress disableShrink />
      <Typography>{caption} ...</Typography>
    </Box>
  );
};

Loading.propTypes = {
  caption: PropTypes.string,
};
