import { useForm } from "react-hook-form";
import { useWeights } from "@contexts/WeightsContext";
import { useSettings } from "@contexts/SettingsContext";
import { nowISODate } from "@util/dateUtil";

export function WeightEntryForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      date: nowISODate(),
    },
  });
  const { addWeight, findDuplicate, loading: weightsLoading } = useWeights();
  const {
    settings,
    fromDisplayWeight,
    loading: settingsLoading,
  } = useSettings();

  if (weightsLoading || settingsLoading) return <p>Loading...</p>;

  const submitForm = (data) => {
    const duplicate = findDuplicate(data);
    if (duplicate) {
      // TODO: confirm box to ask if the user wants to update
      console.warn(`Duplicate date detected for ${data.date}`);
      return;
    }
    addWeight(data.date, fromDisplayWeight(data.weight));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <input type="date" {...register("date", { required: true })} />
        <input type="number" {...register("weight", { required: true })} />
        {settings.weightFormat}
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}
