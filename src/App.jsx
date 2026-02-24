import "./App.css";
import { WeightTable } from "@components/WeightTable";
import { WeightEntryForm } from "@components/WeightEntryForm";
import { WeightChart } from "@components/WeightChart";
import "@fraserelliott/fe-utilities/fe-utilities.css";
import "@fraserelliott/fe-components/stylesheet";
import { SettingsPage } from "@pages/SettingsPage";
import {
  OptionalPortal,
  ToastMessageDisplay,
} from "@fraserelliott/fe-components";

function App() {
  return (
    <>
      <SettingsPage />
      <WeightTable />
      <WeightEntryForm />
      <WeightChart />

      <OptionalPortal portalTarget={document.body}>
        <ToastMessageDisplay />
      </OptionalPortal>
    </>
  );
}

export default App;
