import { WeightChartCard } from "@components/WeightChartCard";
import { WeightTableCard } from "@components/WeightTableCard";
import { WeightEntryForm } from "@components/WeightEntryForm";

export function HomePage() {
  return (
    <>
      <WeightTableCard />
      <WeightEntryForm />
      <WeightChartCard />
    </>
  );
}
