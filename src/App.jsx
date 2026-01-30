import "./App.css";
import { WeightTable } from "./components/WeightTable";
import { useWeights } from "./contexts/WeightsContext";

function App() {
  const { addWeight } = useWeights();

  return (
    <>
      <WeightTable />
      <button
        onClick={() =>
          addWeight({
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            weightKg: 80.5,
          })
        }
      >
        Add today's weight
      </button>
    </>
  );
}

export default App;
