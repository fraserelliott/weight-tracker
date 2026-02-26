import { useGoal } from "@contexts/GoalContext";
import { UI } from "@styles";
import { useForm } from "react-hook-form";
import {
  useToast,
  ConfirmDialog,
  OptionalPortal,
} from "@fraserelliott/fe-components";
import { useEffect } from "react";
import { nowISODate } from "@util/dateUtil";

export function GoalPage() {
  const { goal, updateGoal, deleteGoal, loading } = useGoal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm();

  const { addToastMessage } = useToast();

  useEffect(() => {
    if (loading) return;
    reset({
      type: goal?.type || "",
      weeklyRate: goal?.weeklyRate * 100 || 0,
      start: goal?.start || nowISODate(),
    });
  }, [loading, goal, reset]);

  const submitForm = (data) => {
    if (!isDirty) return;

    const parsed = {
      type: data.type,
      weeklyRate: data.weeklyRate / 100,
      start: data.start,
    };
    updateGoal(parsed);
    addToastMessage("Saved new goal", "success");
    reset(data);
  };

  return (
    <div className={UI.Panel()}>
      <h1 className={UI.Heading()}>Goal</h1>
      <form
        onSubmit={handleSubmit(submitForm)}
        className={UI.Form("fe-flex-column")}
      >
        <div className="fe-d-flex fe-gap-2 fe-flex-wrap">
          <label>I want to</label>
          <select
            {...register("type", { required: true })}
            className={UI.InputPrimary()}
          >
            <option value="lose" className="bg-dropdown">
              lose
            </option>
            <option value="gain" className="bg-dropdown">
              gain
            </option>
          </select>
          <input
            type="number"
            {...register("weeklyRate", { required: true })}
            className={UI.InputPrimary()}
            style={{ width: "4em" }}
            step="0.05"
            min="0"
            max="5"
          />
          <label>% of my weight each week.</label>
        </div>
        <div className="fe-d-flex fe-gap-2">
          <label>Start</label>
          <input
            type="date"
            {...register("start", { required: true })}
            className={UI.InputPrimary()}
          />
        </div>
        <input
          type="submit"
          value="Save"
          disabled={!isDirty}
          className={UI.BtnPrimary()}
        />
      </form>
    </div>
  );
}
