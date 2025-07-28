import { colors, Stack } from "@mui/material";
import PropTypes from "prop-types";

import { RingLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "auto",
};
// eslint-disable-next-line no-unused-vars
export const Loading = ({ caption }) => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} height={"100vh"}>
      <RingLoader
        loading={true}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={0.7}
        color={colors.blue[500]}
      />
    </Stack>
  );
};

Loading.propTypes = {
  caption: PropTypes.string,
};
