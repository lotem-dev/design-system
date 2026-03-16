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

// ─── Code snippet ─────────────────────────────────────────────────────────────

function generateSnippet(variant: ButtonVariant, size: ButtonSize, disabled: boolean, iconMode: IconMode): string {
  const props: string[] = [];
  if (variant !== "primary") props.push(`variant="${variant}"`);
  if (size !== "md")         props.push(`size="${size}"`);
  if (disabled)              props.push("disabled");
  if (iconMode === "only") {
    props.push(`icon={<IconAdd />}`, `ariaLabel="Action"`);
    return `<Button ${props.join(" ")} />`;
  }
  if (iconMode === "start") props.push(`icon={<IconAdd />}`);
  if (iconMode === "end")   props.push(`icon={<IconAdd />}`, `iconPosition="end"`);
  const p = props.length ? " " + props.join(" ") : "";
  return `<Button${p}>\n  Label\n</Button>`;
}

// ─── Playground ───────────────────────────────────────────────────────────────

type PlaygroundProps = {
  variant: ButtonVariant; onVariant: (v: ButtonVariant) => void;
  size: ButtonSize;       onSize:    (s: ButtonSize)    => void;
  disabled: boolean;      onDisabled:(d: boolean)       => void;
  iconMode: IconMode;     onIconMode:(m: IconMode)       => void;
};

function Playground({ variant, onVariant, size, onSize, disabled, onDisabled, iconMode, onIconMode }: PlaygroundProps) {
  const [copied, setCopied] = useState(false);
  const snippet = generateSnippet(variant, size, disabled, iconMode);

  function copy() {
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

  return (
    <>
      <PlaygroundShell
        preview={preview}
        controls={
          <>
            <ControlRow label="Variant">
              {VARIANTS.map(v => <Pill key={v} active={variant === v} onClick={() => onVariant(v)}>{v}</Pill>)}
            </ControlRow>
            <ControlRow label="Size">
              {SIZES.map(s => <Pill key={s} active={size === s} onClick={() => onSize(s)}>{s}</Pill>)}
            </ControlRow>
            <ControlRow label="State">
              <Pill active={!disabled} onClick={() => onDisabled(false)}>default</Pill>
              <Pill active={disabled}  onClick={() => onDisabled(true)}>disabled</Pill>
            </ControlRow>
            <ControlRow label="Icon">
              {(["none", "start", "end", "only"] as IconMode[]).map(m => (
                <Pill key={m} active={iconMode === m} onClick={() => onIconMode(m)}>{m}</Pill>
              ))}
            </ControlRow>
          </>
        }
      />

      {/* Live code output */}
      <div style={{ marginTop: "12px", position: "relative" }}>
        <pre style={{
          margin: 0, padding: "14px 52px 14px 16px",
          backgroundColor: "#18181B", borderRadius: "8px",
          fontSize: "12px", fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          color: "#E4E4E7", lineHeight: "1.7", overflowX: "auto", whiteSpace: "pre",
        }}>
          {snippet}
        </pre>
        <button onClick={copy} style={{
          position: "absolute", top: "10px", right: "10px",
          padding: "3px 10px", fontSize: "11px",
          fontFamily: "'Open Sans', system-ui, sans-serif", fontWeight: 600,
          color: copied ? "#A1A1AA" : "#71717A",
          backgroundColor: "#27272A", border: "1px solid #3F3F46",
          borderRadius: "5px", cursor: "pointer", transition: "color 0.15s",
        }}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </>
  );
}

// ─── Style Reference ──────────────────────────────────────────────────────────
// A single connected table: TypeScript prop → value → CSS class → CSS properties.
// Rows matching the current playground state are highlighted so you see exactly
// what CSS is applied to the component as you interact with it.

type StyleRow = {
  prop:       string;
  value:      string;
  cssClass:   string;
  properties: string[];
};

const STYLE_ROWS: StyleRow[] = [
  // variant
  { prop: "variant", value: "primary",     cssClass: ".primary",     properties: ["background: var(--brand-primary)", "color: var(--text-invert)", "focus ring: var(--brand-primary)"] },
  { prop: "variant", value: "ghost",       cssClass: ".ghost",       properties: ["background: transparent", "color: var(--text-primary)", "hover bg: var(--surface-tertiary)", "focus ring: var(--stroke-primary)"] },
  { prop: "variant", value: "destructive", cssClass: ".destructive", properties: ["background: var(--error-primary)", "color: var(--text-invert)", "focus ring: var(--error-primary)"] },
  // size
  { prop: "size", value: "sm", cssClass: ".sm", properties: ["height: 32px", "padding: 0 var(--space-sm)", "font-size: var(--font-size-sm)"] },
  { prop: "size", value: "md", cssClass: ".md", properties: ["height: 38px", "padding: 0 var(--space-base)", "font-size: var(--font-size-base)"] },
  // disabled
  { prop: "disabled", value: "true", cssClass: ":disabled", properties: ["opacity: 0.5", "cursor: not-allowed"] },
];

// Groups rows by prop so we can use rowSpan for a clean visual grouping.
const STYLE_GROUPS = STYLE_ROWS.reduce<{ prop: string; rows: StyleRow[] }[]>((acc, row) => {
  const last = acc[acc.length - 1];
  if (last && last.prop === row.prop) { last.rows.push(row); }
  else { acc.push({ prop: row.prop, rows: [row] }); }
  return acc;
}, []);

const TH: React.CSSProperties = {
  textAlign: "left", padding: "6px 12px 10px",
  fontSize: "11px", fontWeight: 600, color: "#A1A1AA",
  textTransform: "uppercase", letterSpacing: "0.06em",
  fontFamily: "'Open Sans', system-ui, sans-serif",
  whiteSpace: "nowrap", borderBottom: "2px solid #E4E4E7",
};

const TD: React.CSSProperties = {
  padding: "10px 12px", verticalAlign: "top",
  borderBottom: "1px solid #F4F4F5",
};

type ActiveState = { variant: ButtonVariant; size: ButtonSize; disabled: boolean };

function isActive({ prop, value }: StyleRow, state: ActiveState): boolean {
  if (prop === "variant")  return value === state.variant;
  if (prop === "size")     return value === state.size;
  if (prop === "disabled") return value === "true" && state.disabled;
  return false;
}

function StyleReference(state: ActiveState) {
  return (
    <div>
      {/* Base styles — always applied, no prop controls these */}
      <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
        Base — always applied regardless of props.
      </p>
      <div style={{ overflowX: "auto", marginBottom: "28px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={TH}>Class</th>
              <th style={TH}>Properties</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...TD, whiteSpace: "nowrap" }}>
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>.button</code>
              </td>
              <td style={TD}>
                {["border-radius: var(--radius-base)", "font-weight: var(--font-weight-bold)", "font-family: var(--font-family-default)", "transition: background / border-color / color — 120ms ease"].map(p => (
                  <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: "#52525B", lineHeight: "1.9" }}>{p}</div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Prop-driven styles — connected to playground state */}
      <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
        Prop-driven — updates as you interact with the playground above.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={TH}>Prop</th>
              <th style={TH}>Value</th>
              <th style={TH}>Class</th>
              <th style={TH}>Properties</th>
            </tr>
          </thead>
          <tbody>
            {STYLE_GROUPS.map(({ prop, rows }) =>
              rows.map((row, i) => {
                const active = isActive(row, state);
                return (
                  <tr key={`${prop}-${row.value}`} style={{ backgroundColor: active ? "#F4F4F5" : "transparent" }}>

                    {/* Prop — spans the whole group */}
                    {i === 0 && (
                      <td rowSpan={rows.length} style={{ ...TD, borderRight: "1px solid #F4F4F5", verticalAlign: "middle" }}>
                        <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#EBEBEB", padding: "2px 6px", borderRadius: "4px", whiteSpace: "nowrap" }}>{prop}</code>
                      </td>
                    )}

                    {/* Value */}
                    <td style={{ ...TD, whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#09090B" : "#71717A", fontWeight: active ? 700 : 400 }}>
                        {row.value}
                      </span>
                    </td>

                    {/* CSS class */}
                    <td style={{ ...TD, whiteSpace: "nowrap" }}>
                      <code style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#18181B" : "#A1A1AA", backgroundColor: active ? "#E4E4E7" : "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>
                        {row.cssClass}
                      </code>
                    </td>

                    {/* CSS properties — stacked lines */}
                    <td style={TD}>
                      {row.properties.map(p => (
                        <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#18181B" : "#A1A1AA", lineHeight: "1.9" }}>{p}</div>
                      ))}
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ButtonSection() {
  // State lives here — shared between the playground and the style reference.
  const [variant, setVariant]   = useState<ButtonVariant>("primary");
  const [size, setSize]         = useState<ButtonSize>("md");
  const [disabled, setDisabled] = useState(false);
  const [iconMode, setIconMode] = useState<IconMode>("none");

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
        <Playground
          variant={variant} onVariant={setVariant}
          size={size}       onSize={setSize}
          disabled={disabled} onDisabled={setDisabled}
          iconMode={iconMode} onIconMode={setIconMode}
        />
      </SectionBlock>

      <SectionBlock title="Props">
        <PropsTable source={buttonTsx} />
      </SectionBlock>

      <SectionBlock title="Style Reference">
        <StyleReference variant={variant} size={size} disabled={disabled} />
      </SectionBlock>
    </SplitPage>
  );
}
