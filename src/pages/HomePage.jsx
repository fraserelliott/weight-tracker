import { WeightChart } from "@components/WeightChart";
import { WeightTableCard } from "@components/WeightTableCard";
import { WeightEntryForm } from "@components/WeightEntryForm";

export function HomePage() {
  return (
    <>
      <WeightTableCard />
      <WeightEntryForm />
      <WeightChart />
    </>
  );
}
