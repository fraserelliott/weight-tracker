import { FEComponents } from "@fraserelliott/fe-utilities/presets";
import { cx } from "@fraserelliott/fe-utilities/cx";

export const UI = {
  Btn: (...extra) => cx(FEComponents.Btn, ...extra),
  BtnPrimary: (...extra) => cx(FEComponents.Btn, "app-btn--primary", ...extra),
};
