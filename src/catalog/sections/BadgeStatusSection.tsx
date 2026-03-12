import { useState } from "react";
import { BadgeStatus, type BadgeStatus as BadgeStatusType } from "../../../components/atoms/BadgeStatus";
import { CodeBlock } from "../ui/CodeBlock";
import { PreviewBox } from "../ui/PreviewBox";
import { TokenTable, type TokenRow } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";

import badgeTsx from "../../../components/atoms/BadgeStatus.tsx?raw";

const sources = [
  { filename: "BadgeStatus.tsx", code: badgeTsx },
];

// All the CSS properties used by BadgeStatus, broken down per variant.
// These values come directly from globals.css — hardcoded here so they're
// visible in the catalog without needing to parse CSS at runtime.
const TOKEN_DATA: Record<BadgeStatusType, TokenRow[]> = {
  open: [
    { property: "background-color", token: "--status-open-secondary",  value: "#FFE3E6" },
    { property: "border-color",     token: "--status-open-primary",     value: "#D1002A" },
    { property: "color (text)",     token: "--status-open-primary",     value: "#D1002A" },
    { property: "padding-block",    token: "--space-sm",                value: "8px" },
    { property: "padding-inline",   token: "--space-sm",                value: "8px" },
    { property: "border-radius",    token: "--radius-base",             value: "8px" },
    { property: "border-width",     token: "—",                         value: "1px",    note: "hardcoded" },
    { property: "font-size",        token: "--font-size-sm",            value: "12px",   note: "via role: badge-small" },
    { property: "font-weight",      token: "--font-weight-bold",        value: "700",    note: "via role: badge-small" },
    { property: "line-height",      token: "--line-height-sm",          value: "16px",   note: "via role: badge-small" },
  ],
  fixed: [
    { property: "background-color", token: "--status-fixed-secondary",  value: "#C6F7EE" },
    { property: "border-color",     token: "--status-fixed-primary",    value: "#0A8A6C" },
    { property: "color (text)",     token: "--status-fixed-primary",    value: "#0A8A6C" },
    { property: "padding-block",    token: "--space-sm",                value: "8px" },
    { property: "padding-inline",   token: "--space-sm",                value: "8px" },
    { property: "border-radius",    token: "--radius-base",             value: "8px" },
    { property: "border-width",     token: "—",                         value: "1px",    note: "hardcoded" },
    { property: "font-size",        token: "--font-size-sm",            value: "12px",   note: "via role: badge-small" },
    { property: "font-weight",      token: "--font-weight-bold",        value: "700",    note: "via role: badge-small" },
    { property: "line-height",      token: "--line-height-sm",          value: "16px",   note: "via role: badge-small" },
  ],
  ignored: [
    { property: "background-color", token: "--status-ignored-secondary", value: "#F8FAFC" },
    { property: "border-color",     token: "--status-ignored-primary",   value: "#94A3B8" },
    { property: "color (text)",     token: "--status-ignored-primary",   value: "#94A3B8" },
    { property: "padding-block",    token: "--space-sm",                 value: "8px" },
    { property: "padding-inline",   token: "--space-sm",                 value: "8px" },
    { property: "border-radius",    token: "--radius-base",              value: "8px" },
    { property: "border-width",     token: "—",                          value: "1px",    note: "hardcoded" },
    { property: "font-size",        token: "--font-size-sm",             value: "12px",   note: "via role: badge-small" },
    { property: "font-weight",      token: "--font-weight-bold",         value: "700",    note: "via role: badge-small" },
    { property: "line-height",      token: "--line-height-sm",           value: "16px",   note: "via role: badge-small" },
  ],
};

const VARIANT_DESCRIPTIONS: Record<BadgeStatusType, string> = {
  open:    "The finding is active and unresolved. Uses the error color scale.",
  fixed:   "The finding has been resolved. Uses the success color scale.",
  ignored: "The finding has been acknowledged and dismissed. Uses the neutral color scale.",
};

const USAGE_CODE: Record<BadgeStatusType, string> = {
  open:    `<BadgeStatus status="open" />`,
  fixed:   `<BadgeStatus status="fixed" />`,
  ignored: `<BadgeStatus status="ignored" />`,
};

export function BadgeStatusSection() {
  const [activeVariant, setActiveVariant] = useState<BadgeStatusType>("open");

  return (
    <SplitPage files={sources}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Atom
          </span>
        </div>
        <h1 style={{ margin: "0 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
          BadgeStatus
        </h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Displays the current status of a security finding. The label, colors, and border are all
          determined by the <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>status</code> prop —
          no manual overrides needed or allowed.
        </p>
      </div>

      {/* Live preview — all variants */}
      <SectionBlock title="Preview">
        <PreviewBox>
          <BadgeStatus status="open" />
          <BadgeStatus status="fixed" />
          <BadgeStatus status="ignored" />
        </PreviewBox>
      </SectionBlock>

      {/* Props */}
      <SectionBlock title="Props">
        <TokenTable
          rows={[
            {
              property: "status",
              token: `"open" | "fixed" | "ignored"`,
              value: "required",
              note: "Determines label, color, and border",
            },
          ]}
        />
      </SectionBlock>

      {/* Variant selector + token breakdown */}
      <SectionBlock title="CSS Properties by Variant">
        <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#71717A" }}>
          Select a variant to see the exact tokens and values applied.
        </p>

        {/* Variant tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          {(["open", "fixed", "ignored"] as BadgeStatusType[]).map((v) => (
            <button
              key={v}
              onClick={() => setActiveVariant(v)}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                border: "1px solid",
                borderColor: activeVariant === v ? "#18181B" : "#E4E4E7",
                backgroundColor: activeVariant === v ? "#18181B" : "#FFFFFF",
                color: activeVariant === v ? "#FFFFFF" : "#3F3F46",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'Open Sans', system-ui, sans-serif",
              }}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>

        {/* Variant description */}
        <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#52525B" }}>
          {VARIANT_DESCRIPTIONS[activeVariant]}
        </p>

        <TokenTable rows={TOKEN_DATA[activeVariant]} />
      </SectionBlock>

      {/* Usage code */}
      <SectionBlock title="Usage">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {(["open", "fixed", "ignored"] as BadgeStatusType[]).map((v) => (
            <div key={v}>
              <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                <BadgeStatus status={v} />
              </div>
              <CodeBlock code={USAGE_CODE[v]} />
            </div>
          ))}
        </div>
      </SectionBlock>
    </SplitPage>
  );
}
