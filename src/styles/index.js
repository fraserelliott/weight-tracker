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
  BtnPrimary: (...extra) => cx(UI.Btn(), "btn-primary", ...extra),
  BtnDanger: (...extra) => cx(UI.Btn(), "btn-danger", ...extra),
  InputPrimary: (...extra) =>
    cx(
      "bg-subtle text-primary glass-border box-shadow-subtle fe-rounded-1",
      ...extra,
    ),
  Panel: (...extra) =>
    cx(
      "fe-p-em-3 fe-d-flex fe-flex-column fe-items-center fe-justify-center panel fe-gap-2",
      appearance.Panel,
      ...extra,
    ),
  Table: (...extra) => cx("fe-w-100", ...extra),
  Heading: (...extra) => cx("fe-fw-bold fe-font-size-2", ...extra),
  Form: (...extra) =>
    cx(
      "fe-d-flex fe-gap-3 fe-justify-center fe-items-center fe-w-100",
      ...extra,
    ),
  Navbar: (...extra) =>
    cx(
      "fe-d-flex fe-flex-row list-style-none bg-secondary fe-w-100 fe-justify-center box-shadow-subtle",
      ...extra,
    ),
  NavItem: (...extra) =>
    cx("fe-d-flex fe-items-center fe-p-em-2 navlink", ...extra),
};
