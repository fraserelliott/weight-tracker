import { useSettings } from "@contexts/SettingsContext";
import { UI } from "@styles";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import {
  formatDate,
  parseDateFormatString,
} from "@fraserelliott/date-formatter";
import { nowISODate } from "@util/dateUtil";
import { useToast } from "@fraserelliott/fe-components";

const weightOptions = ["kg", "lb"];
const dateFormats = [
  "DD-MM-YYYY",
  "DD/MM/YYYY",
  "MM-DD-YYYY",
  "MM/DD/YYYY",
  "DD.MM.YYYY",
  "WWW DD-MM-YYYY",
  "WWW DD/MM/YYYY",
  "WWW MM-DD-YYYY",
  "WWW MM/DD/YYYY",
  "WWW DD.MM.YYYY",
];

export function SettingsPage() {
  const {
    settings,
    setDateFormat,
    setWeightUnit,
    loading: settingsLoading,
  } = useSettings();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      weightUnit: "kg",
      dateFormat: "DD/MM/YYYY",
    },
  });

  const { addToastMessage } = useToast();

  useEffect(() => {
    if (settingsLoading) return;
    reset({
      weightUnit: settings.weightUnit || "kg",
      dateFormat: settings.dateFormat.formatString || "DD/MM/YYYY",
    });
  }, [
    settingsLoading,
    reset,
    settings.dateFormat.formatString,
    settings.weightUnit,
  ]);

  const dateFormat = watch("dateFormat");
  const preview = useMemo(() => {
    try {
      const parsed = parseDateFormatString(dateFormat);
      return formatDate(nowISODate(), parsed);
    } catch {
      return "-";
    }
  }, [dateFormat]);

  const submitForm = (data) => {
    if (!isDirty) return;
    setDateFormat(data.dateFormat);
    setWeightUnit(data.weightUnit);
    addToastMessage("Saved new settings", "success");
    reset(data);
  };

  if (settingsLoading) return <p>Loading...</p>;

  return (
    <div className={UI.Panel()}>
      <h1 className={UI.Heading()}>Settings</h1>
      <form
        className={UI.Form("fe-flex-column")}
        onSubmit={handleSubmit(submitForm)}
      >
        <label>Weight Unit</label>
        <select
          {...register("weightUnit", { required: true })}
          className={UI.InputPrimary("min-width-40")}
        >
          {weightOptions.map((unit) => {
            return (
              <option key={unit} value={unit} className="bg-dropdown">
                {unit}
              </option>
            );
          })}
        </select>
        <label>Date Format</label>
        <select
          {...register("dateFormat", { required: true })}
          className={UI.InputPrimary("min-width-40")}
        >
          {dateFormats.map((format) => {
            return (
              <option key={format} value={format} className="bg-dropdown">
                {format}
              </option>
            );
          })}
        </select>
        <span className="fe-text-muted">
          Example: <strong className="fe-fw-bold">{preview}</strong>
        </span>
        <button className={UI.BtnPrimary()} disabled={!isDirty}>
          Save
        </button>
      </form>
    </div>
  );
}
