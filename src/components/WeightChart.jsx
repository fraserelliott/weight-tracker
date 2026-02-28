import { nowISODate, subDaysISO, isISOInRange } from "@util/dateUtil";
import { useMemo } from "react";
import { useSettings } from "@contexts/SettingsContext";
import { useWeights } from "@contexts/WeightsContext";
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Label,
} from "recharts";

export function WeightChart({ extended }) {
  const {
    settings,
    formatDayMonth,
    toDisplayWeight,
    loading: settingsLoading,
  } = useSettings();
  const { weightsWithStats, loading: weightsLoading } = useWeights();

  const chartData = useMemo(() => {
    const end = nowISODate();
    const start = subDaysISO(end, 92);

    // filter to date range and convert rolling average to user's chosen unit
    return weightsWithStats
      .filter((w) => isISOInRange(w.date, start, end))
      .map((w) => ({
        date: w.date,
        rollingAverage: toDisplayWeight(w.rollingAverageKg.avg),
        goalWeight:
          w.goalWeightKg?.weight != null
            ? toDisplayWeight(w.goalWeightKg.weight)
            : null,
      }))
      .reverse();
  }, [weightsWithStats, toDisplayWeight]);

  if (weightsLoading || settingsLoading) return <p>Loading...</p>;
  if (!chartData.length) return <p>No entries yet.</p>;

  return (
    <div style={{ height: extended ? "clamp(400px, 60vh, 800px)" : "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="5 5" strokeOpacity={0.4} />
          <Tooltip
            formatter={(value, name) => [
              `${value} ${settings.weightUnit}`,
              name,
            ]}
            wrapperClassName="chart-tooltip"
          />
          <XAxis
            dataKey="date"
            tickFormatter={(iso) => formatDayMonth(iso)}
            minTickGap={20}
            tick={{ fill: "var(--text-primary)" }}
          >
            <Label
              value="Date"
              position="insideBottom"
              offset={-5}
              style={{ fill: "var(--text-primary)" }}
            />
          </XAxis>
          <YAxis
            domain={[(min) => Math.floor(min - 1), (max) => Math.ceil(max + 1)]}
            tick={{ fill: "var(--text-primary)" }}
          >
            <Label
              value={`Weight (${settings.weightUnit})`}
              angle={-90}
              position="insideLeft"
              offset={10}
              style={{ fill: "var(--text-primary)" }}
            />
          </YAxis>
          <Line
            dataKey="rollingAverage"
            name="Rolling Average"
            stroke="#3B82F6"
            strokeWidth={2.5}
            activeDot={{ r: 6 }}
            strokeDasharray="5 5"
          />
          <Line
            dataKey="goalWeight"
            name="Target Weight"
            stroke="#D1D5DB"
            strokeWidth={2.5}
            activeDot={{ r: 6 }}
            strokeDasharray="5 5"
            opacity="0.7"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
