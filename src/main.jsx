import { CssBaseline, ThemeProvider } from "@mui/material";
import GlobalStyles from "@mui/material/GlobalStyles";
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
import globalStyles from "./globalStyles.jsx";
// import { Auth0Provider } from "@auth0/auth0-react";
// import { RENDER_API_ENDPOINT } from "./utils/constants.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const persistor = persistStore(store);

// Gán redux store vào file authorizeAxios để có thể sử dụng trong các request
injectStore(store);

// Cấu hình socket-io client tại đây và export ra biến socketIoInstance

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* basename trên url sẽ cần đi qua basename rồi mới đến các route */}
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter basename="/">
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
              {/* <Auth0Provider
                domain="dev-s3wgtzvgfx03vv4a.jp.auth0.com"
                clientId="NWR2xT0uGcZElCHwZsA4DkoaTGhzAXFd"
                authorizationParams={{
                  redirect_uri: window.location.origin,
                  // audience: RENDER_API_ENDPOINT, // cần audience để nhận được acess token chuẩn
                }}
                cacheLocation="localstorage" // default is memory hoặc localstorage để ko bị gọi lại api nhưng để sử  dụng cơ chế sso (login, logout) thì cần chuyển về memory
                // useRefreshTokens={true} // Bật refresh token, (khi timelife của refreshToken được cấu hình dưới 20s thì nó sẽ nó sẽ tụ tạo token mới mỗi khi F5)
                // useRefreshTokensFallback={true} // hỗ trợ cho cái ở trên (ko có sẽ lỗi)
              > */}
              <CssBaseline />
              <GlobalStyles styles={globalStyles} />

              <App />

              <ToastContainer position="bottom-left" autoClose={4000} />
              {/* </Auth0Provider> */}
            </ConfirmProvider>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
