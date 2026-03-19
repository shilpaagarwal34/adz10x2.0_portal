import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import App from "./App.jsx";
const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY;
const GOOGLE_MAPS_LIBRARIES = ["places"];
// import { LoadScript } from "@react-google-maps/api";
import { LoadScriptNext as LoadScript } from "@react-google-maps/api";

import store from "./store/store.js";
import "react-loading-skeleton/dist/skeleton.css";

const normalizeToastMessage = (message, fallback) => {
  if (typeof message === "string") return message;
  if (typeof message === "number") return String(message);
  if (message && typeof message === "object") {
    return (
      message.message ||
      message.error ||
      message.statusText ||
      fallback
    );
  }
  return fallback;
};

// Guard against React error #31 when an object is passed to toast.*
const originalToastError = toast.error.bind(toast);
const originalToastInfo = toast.info.bind(toast);
const originalToastWarn = toast.warn.bind(toast);
toast.error = (message, options) =>
  originalToastError(normalizeToastMessage(message, "Something went wrong."), options);
toast.info = (message, options) =>
  originalToastInfo(normalizeToastMessage(message, "Info"), options);
toast.warn = (message, options) =>
  originalToastWarn(normalizeToastMessage(message, "Warning"), options);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    
  // </StrictMode>
  <Provider store={store}>
      <LoadScript
        id="google-map-script"
        googleMapsApiKey={MAP_API_KEY}
        libraries={GOOGLE_MAPS_LIBRARIES}
        loadingElement={<></>}
      >
        <App />
      </LoadScript>
    </Provider>
);
