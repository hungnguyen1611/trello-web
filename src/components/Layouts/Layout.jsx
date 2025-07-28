/* eslint-disable react/prop-types */
import { Box, Grid } from "@mui/material";
import AppBar from "../AppBar";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <AppBar />

      <Box sx={{ paddingX: 2, my: 4 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 5, md: 3 }}>
            <SideBar />
          </Grid>

          <Grid size={{ xs: 12, sm: 7, md: 9 }}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
