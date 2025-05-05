import { CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import theme from "./theme.jsx";
import { ConfirmProvider } from "material-ui-confirm";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ConfirmProvider
        defaultOptions={{
          allowClose: false,
          dialogProps: {
            maxWidth: "xs",
          },
          cancellationButtonProps: {
            color: "secondary",
          },
          confirmationButtonProps: {
            color: "success",
          },
        }}
      >
        <CssBaseline />

        <App />

        <ToastContainer position="bottom-left" autoClose={2000} />
      </ConfirmProvider>
    </ThemeProvider>
  </StrictMode>
);
