import { cx } from "@fraserelliott/fe-utilities/cx";

export const appearance = {
  Panel: "bg-secondary glass-border fe-rounded-1 box-shadow-subtle",
};

export const UI = {
  Btn: (...extra) =>
    cx(
      "fe-d-inline-flex fe-items-center fe-justify-center fe-gap-2 fe-p-em-1 fe-rounded-2 fe-pressable box-shadow-subtle",
      ...extra,
    ),
  BtnPrimary: (...extra) => cx(UI.Btn(), "app-btn-primary", ...extra),
  InputPrimary: (...extra) =>
    cx(
      "bg-subtle text-primary glass-border box-shadow-subtle fe-rounded-1",
      ...extra,
    ),
  Panel: (...extra) => cx("fe-p-em-1", appearance.Panel, ...extra),
};
