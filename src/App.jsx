import "./App.css";
import { WeightTable } from "@components/WeightTable";
import { WeightEntryForm } from "@components/WeightEntryForm";
import "@fraserelliott/fe-utilities/fe-utilities.css";
import "@fraserelliott/fe-components/stylesheet";

function App() {
  return (
    <>
      <WeightTable />
      <WeightEntryForm />
    </>
  );
}

export default App;
