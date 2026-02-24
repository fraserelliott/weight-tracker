import { WeightChart } from "@components/WeightChart";
import { WeightTable } from "@components/WeightTable";
import { WeightEntryForm } from "@components/WeightEntryForm";

export function HomePage() {
  return (
    <>
      <WeightTable />
      <WeightEntryForm />
      <WeightChart />
    </>
  );
}
