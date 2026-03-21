import { useState } from "react";
import { Button, type ButtonVariant, type ButtonSize } from "../../../components/interactions/Button";
import { IconWrapper } from "../../../components/layout/IconWrapper";
import { IconAdd }          from "../../../components/icons/usecases/IconAdd";
import { IconSearch }       from "../../../components/icons/usecases/IconSearch";
import { IconEdit }         from "../../../components/icons/usecases/IconEdit";
import { IconDelete }       from "../../../components/icons/usecases/IconDelete";
import { IconDownload }     from "../../../components/icons/usecases/IconDownload";
import { IconFilter }       from "../../../components/icons/usecases/IconFilter";
import { IconSend }         from "../../../components/icons/usecases/IconSend";
import { IconShare }        from "../../../components/icons/usecases/IconShare";
import { IconExternalLink } from "../../../components/icons/usecases/IconExternalLink";
import { IconX }            from "../../../components/icons/usecases/IconX";
import { IconCopy }         from "../../../components/icons/usecases/IconCopy";
import { PropsTable }       from "../ui/PropsTable";
import { SectionBlock }     from "../ui/SectionBlock";
import { SplitPage }        from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { TypographyReference, type TypographyEntry } from "../ui/TypographyReference";

import buttonTsx from "../../../components/interactions/Button.tsx?raw";
import buttonCss from "../../../components/interactions/Button.module.css?raw";

const sources = [
  { filename: "Button.tsx",        code: buttonTsx },
  { filename: "Button.module.css", code: buttonCss },
];

const VARIANTS: ButtonVariant[] = ["primary", "ghost", "destructive"];
const SIZES: ButtonSize[]       = ["sm", "md"];
type IconPosition = "none" | "start" | "end" | "both" | "only";

// ─── Icon Options ──────────────────────────────────────────────────────────────

type IconOption = { name: string; component: React.ComponentType };

const ICON_OPTIONS: IconOption[] = [
  { name: "IconAdd",          component: IconAdd },
  { name: "IconSearch",       component: IconSearch },
  { name: "IconEdit",         component: IconEdit },
  { name: "IconDelete",       component: IconDelete },
  { name: "IconDownload",     component: IconDownload },
  { name: "IconFilter",       component: IconFilter },
  { name: "IconSend",         component: IconSend },
  { name: "IconShare",        component: IconShare },
  { name: "IconExternalLink", component: IconExternalLink },
  { name: "IconCopy",         component: IconCopy },
  { name: "IconX",            component: IconX },
];

// ─── Icon Picker ───────────────────────────────────────────────────────────────

function IconPicker({ selected, onSelect }: { selected: IconOption; onSelect: (icon: IconOption) => void }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
      {ICON_OPTIONS.map(option => {
        const isSelected = option.name === selected.name;
        return (
          <button
            key={option.name}
            title={option.name}
            onClick={() => onSelect(option)}
            style={{
              width: "28px", height: "28px",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: isSelected ? "1px solid #18181B" : "1px solid #E4E4E7",
              borderRadius: "6px", cursor: "pointer",
              background: isSelected ? "#18181B" : "#FFFFFF",
              color: isSelected ? "#FFFFFF" : "#52525B",
              transition: "all 100ms ease",
            }}
          >
            <IconWrapper icon={option.component} size="sm" />
          </button>
        );
      })}
    </div>
  );
}

// ─── Code snippet ──────────────────────────────────────────────────────────────

function generateSnippet(
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean,
  label: string,
  iconPosition: IconPosition,
  iconName: string,
): string {
  const props: string[] = [];
  if (variant !== "primary") props.push(`variant="${variant}"`);
  if (size !== "md")         props.push(`size="${size}"`);
  if (disabled)              props.push("disabled");

  const iconJsx = `{<${iconName} />}`;

  if (iconPosition === "only") {
    props.push(`icon=${iconJsx}`, `ariaLabel="Action"`);
    return `<Button ${props.join(" ")} />`;
  }

  if (iconPosition === "start" || iconPosition === "both") props.push(`icon=${iconJsx}`);
  if (iconPosition === "end"   || iconPosition === "both") props.push(`iconEnd=${iconJsx}`);

  const p = props.length ? " " + props.join(" ") : "";
  return `<Button${p}>\n  ${label}\n</Button>`;
}

// ─── Playground ────────────────────────────────────────────────────────────────

type PlaygroundProps = {
  variant: ButtonVariant;      onVariant:      (v: ButtonVariant)   => void;
  size: ButtonSize;            onSize:         (s: ButtonSize)      => void;
  disabled: boolean;           onDisabled:     (d: boolean)         => void;
  label: string;               onLabel:        (l: string)          => void;
  iconPosition: IconPosition;  onIconPosition: (p: IconPosition)    => void;
  selectedIcon: IconOption;    onSelectedIcon: (i: IconOption)      => void;
};

function Playground({
  variant, onVariant, size, onSize, disabled, onDisabled,
  label, onLabel, iconPosition, onIconPosition, selectedIcon, onSelectedIcon,
}: PlaygroundProps) {
  const [copied, setCopied] = useState(false);
  const snippet = generateSnippet(variant, size, disabled, label, iconPosition, selectedIcon.name);

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const iconEl = <IconWrapper icon={selectedIcon.component} size={size === "sm" ? "sm" : "md"} />;

  const preview = iconPosition === "only" ? (
    <Button variant={variant} size={size} disabled={disabled} icon={iconEl} ariaLabel="Action" />
  ) : (
    <Button
      variant={variant} size={size} disabled={disabled}
      icon={iconPosition === "start" || iconPosition === "both" ? iconEl : undefined}
      iconEnd={iconPosition === "end" || iconPosition === "both" ? iconEl : undefined}
    >
      {label}
    </Button>
  );

  return (
    <>
      <PlaygroundShell
        preview={preview}
        controls={
          <>
            {/* Label - text input */}
            <ControlRow label="Label">
              <input
                value={label}
                onChange={e => onLabel(e.target.value)}
                placeholder="Button label"
                style={{
                  padding: "4px 10px", fontSize: "12px",
                  fontFamily: "'Open Sans', system-ui, sans-serif",
                  border: "1px solid #E4E4E7", borderRadius: "6px",
                  color: "#09090B", background: "#FFFFFF",
                  outline: "none", width: "140px",
                }}
              />
            </ControlRow>

            {/* Variant */}
            <ControlRow label="Variant">
              {VARIANTS.map(v => <Pill key={v} active={variant === v} onClick={() => onVariant(v)}>{v}</Pill>)}
            </ControlRow>

            {/* Size */}
            <ControlRow label="Size">
              {SIZES.map(s => <Pill key={s} active={size === s} onClick={() => onSize(s)}>{s}</Pill>)}
            </ControlRow>

            {/* State */}
            <ControlRow label="State">
              <Pill active={!disabled} onClick={() => onDisabled(false)}>default</Pill>
              <Pill active={disabled}  onClick={() => onDisabled(true)}>disabled</Pill>
            </ControlRow>

            {/* Icon position */}
            <ControlRow label="Icon">
              {(["none", "start", "end", "both", "only"] as IconPosition[]).map(p => (
                <Pill key={p} active={iconPosition === p} onClick={() => onIconPosition(p)}>{p}</Pill>
              ))}
            </ControlRow>

            {/* Icon picker - only shown when an icon position is active */}
            {iconPosition !== "none" && (
              <ControlRow label="Pick">
                <IconPicker selected={selectedIcon} onSelect={onSelectedIcon} />
              </ControlRow>
            )}
          </>
        }
      />

      {/* Code snippet */}
      <div style={{ marginTop: "12px" }}>
        <div style={{ position: "relative" }}>
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
      </div>
    </>
  );
}

// ─── Style Reference ──────────────────────────────────────────────────────────

const TYPOGRAPHY_ROWS: TypographyEntry[] = [
  { element: "Button text (md / lg)", role: "body-bold" },
  { element: "Button text (sm)",      role: "label-bold" },
];

type StyleRow = {
  prop:       string;
  value:      string;
  cssClass:   string;
  properties: string[];
};

const STYLE_ROWS: StyleRow[] = [
  { prop: "variant", value: "primary",     cssClass: ".primary",     properties: ["background: var(--brand-primary)", "color: var(--text-invert)", "focus ring: var(--brand-primary)"] },
  { prop: "variant", value: "ghost",       cssClass: ".ghost",       properties: ["background: transparent", "color: var(--text-primary)", "hover bg: var(--surface-tertiary)", "focus ring: var(--stroke-primary)"] },
  { prop: "variant", value: "destructive", cssClass: ".destructive", properties: ["background: var(--error-primary)", "color: var(--text-invert)", "focus ring: var(--error-primary)"] },
  { prop: "size", value: "sm", cssClass: ".sm", properties: ["composes: label-bold", "height: 32px", "padding: 0 var(--space-sm)"] },
  { prop: "size", value: "md", cssClass: ".md", properties: ["composes: body-bold", "height: 38px", "padding: 0 var(--space-base)"] },
  { prop: "disabled", value: "true", cssClass: ":disabled", properties: ["opacity: 0.5", "cursor: not-allowed"] },
];

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
      <TypographyReference rows={TYPOGRAPHY_ROWS} />
      <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
        Base - always applied regardless of props.
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
                {["border-radius: var(--radius-base)", "transition: background / border-color / color - 120ms ease"].map(p => (
                  <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: "#52525B", lineHeight: "1.9" }}>{p}</div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
        Prop-driven - updates as you interact with the playground above.
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
                    {i === 0 && (
                      <td rowSpan={rows.length} style={{ ...TD, borderRight: "1px solid #F4F4F5", verticalAlign: "middle" }}>
                        <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#EBEBEB", padding: "2px 6px", borderRadius: "4px", whiteSpace: "nowrap" }}>{prop}</code>
                      </td>
                    )}
                    <td style={{ ...TD, whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#09090B" : "#71717A", fontWeight: active ? 700 : 400 }}>
                        {row.value}
                      </span>
                    </td>
                    <td style={{ ...TD, whiteSpace: "nowrap" }}>
                      <code style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#18181B" : "#A1A1AA", backgroundColor: active ? "#E4E4E7" : "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>
                        {row.cssClass}
                      </code>
                    </td>
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
  const [variant,      setVariant]      = useState<ButtonVariant>("primary");
  const [size,         setSize]         = useState<ButtonSize>("md");
  const [disabled,     setDisabled]     = useState(false);
  const [label,        setLabel]        = useState("Label");
  const [iconPosition, setIconPosition] = useState<IconPosition>("none");
  const [selectedIcon, setSelectedIcon] = useState<IconOption>(ICON_OPTIONS[0]);

  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Button</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          The primary interactive element. Three variants cover the full range of action hierarchy -
          from the main CTA down to destructive actions. Supports text labels, icons, or both.
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ flex: "0 0 52%", minWidth: 0, position: "sticky", top: "24px", alignSelf: "flex-start" }}>
          <SectionBlock title="Playground">
            <Playground
              variant={variant}           onVariant={setVariant}
              size={size}                 onSize={setSize}
              disabled={disabled}         onDisabled={setDisabled}
              label={label}               onLabel={setLabel}
              iconPosition={iconPosition} onIconPosition={setIconPosition}
              selectedIcon={selectedIcon} onSelectedIcon={setSelectedIcon}
            />
          </SectionBlock>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionBlock title="Style Reference">
            <StyleReference variant={variant} size={size} disabled={disabled} />
          </SectionBlock>
        </div>
      </div>

      <SectionBlock title="Props">
        <PropsTable source={buttonTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
