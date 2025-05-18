import { CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import theme from "./theme.jsx";
import { ConfirmProvider } from "material-ui-confirm";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
// Kỹ thuật Inject Store: cho phép sử dụng redux store trong các file nằm ngoài phạm vi component (như authorizeAxios)
import { injectStore } from "./utils/authorizeAxios.js";
const persistor = persistStore(store);

// Gán redux store vào file authorizeAxios để có thể sử dụng trong các request
injectStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* basename trên url sẽ cần đi qua basename rồi mới đến các route */}
    <BrowserRouter basename="/">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
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

              <ToastContainer position="bottom-left" autoClose={4000} />
            </ConfirmProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
