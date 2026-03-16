import { useState } from "react";
import { Button, type ButtonVariant, type ButtonSize } from "../../../components/interactions/Button";
import { IconWrapper } from "../../../components/layout/IconWrapper";
import { IconAdd } from "../../../components/icons/usecases/IconAdd";
import { PropsTable } from "../ui/PropsTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import buttonTsx from "../../../components/interactions/Button.tsx?raw";
import buttonCss from "../../../components/interactions/Button.module.css?raw";

const sources = [
  { filename: "Button.tsx",        code: buttonTsx },
  { filename: "Button.module.css", code: buttonCss },
];

const VARIANTS: ButtonVariant[] = ["primary", "ghost", "destructive"];
const SIZES: ButtonSize[]       = ["sm", "md"];
type IconMode = "none" | "start" | "end" | "only";

const ICON_SM = <IconWrapper icon={IconAdd} size="sm" />;

// ─── Code snippet generator ───────────────────────────────────────────────────

function generateSnippet(
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean,
  iconMode: IconMode,
): string {
  const props: string[] = [];

  if (variant !== "primary")   props.push(`variant="${variant}"`);
  if (size !== "md")           props.push(`size="${size}"`);
  if (disabled)                props.push("disabled");

  if (iconMode === "only") {
    props.push(`icon={<IconAdd />}`);
    props.push(`ariaLabel="Action"`);
    const inline = props.join(" ");
    return `<Button ${inline} />`;
  }

  if (iconMode === "start")    props.push(`icon={<IconAdd />}`);
  if (iconMode === "end") {
    props.push(`icon={<IconAdd />}`);
    props.push(`iconPosition="end"`);
  }

  const propsStr = props.length ? " " + props.join(" ") : "";
  return `<Button${propsStr}>\n  Label\n</Button>`;
}

// ─── Playground ───────────────────────────────────────────────────────────────

function Playground() {
  const [variant, setVariant]   = useState<ButtonVariant>("primary");
  const [size, setSize]         = useState<ButtonSize>("md");
  const [disabled, setDisabled] = useState(false);
  const [iconMode, setIconMode] = useState<IconMode>("none");
  const [copied, setCopied]     = useState(false);

  const snippet = generateSnippet(variant, size, disabled, iconMode);

  function copySnippet() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const preview = iconMode === "only" ? (
    <Button variant={variant} size={size} disabled={disabled} icon={ICON_SM} ariaLabel="Action" />
  ) : (
    <Button
      variant={variant} size={size} disabled={disabled}
      icon={iconMode !== "none" ? ICON_SM : undefined}
      iconPosition={iconMode === "end" ? "end" : "start"}
    >
      Label
    </Button>
  );

  const controls = (
    <>
      <ControlRow label="Variant">
        {VARIANTS.map(v => <Pill key={v} active={variant === v} onClick={() => setVariant(v)}>{v}</Pill>)}
      </ControlRow>
      <ControlRow label="Size">
        {SIZES.map(s => <Pill key={s} active={size === s} onClick={() => setSize(s)}>{s}</Pill>)}
      </ControlRow>
      <ControlRow label="State">
        <Pill active={!disabled} onClick={() => setDisabled(false)}>default</Pill>
        <Pill active={disabled}  onClick={() => setDisabled(true)}>disabled</Pill>
      </ControlRow>
      <ControlRow label="Icon">
        {(["none", "start", "end", "only"] as IconMode[]).map(m => (
          <Pill key={m} active={iconMode === m} onClick={() => setIconMode(m)}>{m}</Pill>
        ))}
      </ControlRow>
    </>
  );

  return (
    <>
      <PlaygroundShell preview={preview} controls={controls} />

      {/* Live code output */}
      <div style={{ marginTop: "12px", position: "relative" }}>
        <pre style={{
          margin: 0,
          padding: "14px 48px 14px 16px",
          backgroundColor: "#18181B",
          borderRadius: "8px",
          fontSize: "12px",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          color: "#E4E4E7",
          lineHeight: "1.7",
          overflowX: "auto",
          whiteSpace: "pre",
        }}>
          {snippet}
        </pre>
        <button
          onClick={copySnippet}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "3px 10px",
            fontSize: "11px",
            fontFamily: "'Open Sans', system-ui, sans-serif",
            fontWeight: 600,
            color: copied ? "#A1A1AA" : "#71717A",
            backgroundColor: "#27272A",
            border: "1px solid #3F3F46",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "color 0.15s",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </>
  );
}

// ─── CSS breakdown ────────────────────────────────────────────────────────────

const HEADER: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  color: "#A1A1AA",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  fontFamily: "'Open Sans', system-ui, sans-serif",
  padding: "6px 12px 10px",
  textAlign: "left",
  whiteSpace: "nowrap",
  borderBottom: "2px solid #E4E4E7",
};

const CELL: React.CSSProperties = {
  padding: "9px 12px",
  fontSize: "12px",
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  borderBottom: "1px solid #F4F4F5",
  verticalAlign: "top",
};

function CssTable({ rows }: { rows: { property: string; value: string }[] }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={HEADER}>Property</th>
            <th style={HEADER}>Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ property, value }) => (
            <tr key={property}>
              <td style={{ ...CELL, color: "#3F3F46" }}>{property}</td>
              <td style={{ ...CELL, color: "#18181B" }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SizeCompare() {
  const rows: { label: string; sm: string; md: string }[] = [
    { label: "height",      sm: "32px",               md: "38px" },
    { label: "padding",     sm: "0 var(--space-sm)",   md: "0 var(--space-base)" },
    { label: "font-size",   sm: "var(--font-size-sm)", md: "var(--font-size-base)" },
    { label: "gap",         sm: "var(--space-sm)",     md: "var(--space-sm)" },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={HEADER}>Property</th>
            <th style={HEADER}>sm</th>
            <th style={HEADER}>md</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, sm, md }) => (
            <tr key={label}>
              <td style={{ ...CELL, color: "#3F3F46" }}>{label}</td>
              <td style={{ ...CELL, color: "#18181B" }}>{sm}</td>
              <td style={{ ...CELL, color: "#18181B" }}>{md}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function VariantCompare() {
  const rows: { label: string; primary: string; ghost: string; destructive: string }[] = [
    { label: "background", primary: "var(--brand-primary)",  ghost: "transparent",           destructive: "var(--error-primary)"  },
    { label: "color",      primary: "var(--text-invert)",    ghost: "var(--text-primary)",   destructive: "var(--text-invert)"    },
    { label: "hover bg",   primary: "—",                     ghost: "var(--surface-tertiary)", destructive: "—"                   },
    { label: "focus ring", primary: "var(--brand-primary)",  ghost: "var(--stroke-primary)", destructive: "var(--error-primary)"  },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={HEADER}>Property</th>
            <th style={HEADER}>primary</th>
            <th style={HEADER}>ghost</th>
            <th style={HEADER}>destructive</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, primary, ghost, destructive }) => (
            <tr key={label}>
              <td style={{ ...CELL, color: "#3F3F46" }}>{label}</td>
              <td style={{ ...CELL, color: "#18181B" }}>{primary}</td>
              <td style={{ ...CELL, color: "#18181B" }}>{ghost}</td>
              <td style={{ ...CELL, color: "#18181B" }}>{destructive}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ButtonSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Button</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          The primary interactive element. Three variants cover the full range of action hierarchy —
          from the main CTA down to destructive actions. Supports text labels, icons, or both.
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>

      <SectionBlock title="Props">
        <PropsTable source={buttonTsx} />
      </SectionBlock>

      <SectionBlock title="Base Styles">
        <CssTable rows={[
          { property: "border-radius", value: "var(--radius-base)" },
          { property: "font-weight",   value: "var(--font-weight-bold)" },
          { property: "font-family",   value: "var(--font-family-default)" },
          { property: "transition",    value: "background 120ms, border-color 120ms, color 120ms" },
          { property: "disabled",      value: "opacity: 0.5, cursor: not-allowed" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Sizes">
        <SizeCompare />
      </SectionBlock>

      <SectionBlock title="Variants">
        <VariantCompare />
      </SectionBlock>
    </SplitPage>
  );
}
