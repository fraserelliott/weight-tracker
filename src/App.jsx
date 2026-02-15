import "./App.css";
import { WeightTable } from "@components/WeightTable";
import { WeightEntryForm } from "@components/WeightEntryForm";
import "@fraserelliott/fe-utilities/fe-utilities.css";

function App() {
  return (
    <>
      <WeightTable />
      <WeightEntryForm />
    </>
  );
}

export default App;
