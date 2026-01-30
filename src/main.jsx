import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { DataProvider } from "./contexts/DataContext.jsx";
import { WeightsProvider } from "./contexts/WeightsContext.jsx";

createRoot(document.getElementById("root")).render(
  <DataProvider>
    <WeightsProvider>
      <App />
    </WeightsProvider>
  </DataProvider>,
);
