import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider.jsx";
import { Toaster } from "./components/ui/toaster.jsx";
import { Theme } from "@chakra-ui/react";
import App from "./App.jsx";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <Theme appearance="dark">
        <App />
        <Toaster />
      </Theme>
    </Provider>
  </StrictMode>
);
