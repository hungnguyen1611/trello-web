import { createTheme } from "@mui/material/styles";

const APP_BAR_HEIGHT = "65px";
const BORD_BAR_HEIGHT = "70px";
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BORD_BAR_HEIGHT})`;
const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "50px";
const theme = createTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BORD_BAR_HEIGHT,
    boardBarContent: BOARD_CONTENT_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
  },

  globalStyles: {
    a: {
      textDecoration: "none",
    },
  },
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        // primary: teal,
        // secondary: deepOrange,
      },
    },
    dark: {
      palette: {
        mode: "dark",
        // primary: cyan,
        // secondary: orange,

        background: {
          paper: "#fff",
        },
        text: {
          primary: "#173A5E",
          secondary: "#46505A",
        },
        action: {
          active: "#001E3C",
        },
        success: {
          main: "#4caf50", // ✅ Đúng
        },
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "*::-webkit-scrollbar": {
            width: "0.5rem",
            height: "0.5rem",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#7f8c8d",
            borderRadius: "0.5rem",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#bdc3c7",
          },
        },
      },
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: {
          fontSize: "0.875rem",

          "& fieldset": {
            borderWidth: "1px",
          },
          "&:hover fieldset": {
            borderWidth: "2px",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root: {
          fontSize: "0.875rem",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          ".MuiTypography-body1": {
            fontSize: "0.875rem",
          },
        },
      },
    },
  },
  spacing: (factor) => `${10 * factor}px`,
});

export default theme;
