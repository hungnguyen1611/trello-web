/* eslint-disable react/prop-types */
import { Box, Grid } from "@mui/material";
import AppBar from "../AppBar";
import SideBar from "../SideBar/SideBar";

export default function Layout({ children }) {
  return (
    <>
      <AppBar />

      <Box sx={{ paddingX: 2, my: 4 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <SideBar />
          </Grid>

          <Grid size={{ xs: 12, sm: 9 }}>{children}</Grid>
        </Grid>
      </Box>
    </>
  );
}
