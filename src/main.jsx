import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { DataProvider } from "./contexts/DataContext.jsx";
import { WeightsProvider } from "./contexts/WeightsContext.jsx";
import { SettingsProvider } from "./contexts/SettingsContext.jsx";
import { ToastProvider } from "@fraserelliott/fe-components";

createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <DataProvider>
      <SettingsProvider>
        <WeightsProvider>
          <App />
        </WeightsProvider>
      </SettingsProvider>
    </DataProvider>
  </ToastProvider>,
);
