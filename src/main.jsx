import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY;
const GOOGLE_MAPS_LIBRARIES = ["places"];
// import { LoadScript } from "@react-google-maps/api";
import { LoadScriptNext as LoadScript } from "@react-google-maps/api";

import store from "./store/store.js";
import "react-loading-skeleton/dist/skeleton.css";

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
