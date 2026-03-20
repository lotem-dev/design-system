import { useState } from "react";
import { Text, type TypographyRole, type TypographyVariant } from "../../../components/foundation/Text";
import { PropsTable } from "../ui/PropsTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import textTsx       from "../../../components/foundation/Text.tsx?raw";
import textModuleCss from "../../../components/foundation/Text.module.css?raw";

const sources = [
  { filename: "Text.tsx",        code: textTsx       },
  { filename: "Text.module.css", code: textModuleCss },
];

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROLES: TypographyRole[] = ["headline", "title", "medium", "body", "label", "xs"];

// headline/title/medium only have bold; body/label/xs have regular + bold (label also has caps)
const VARIANTS_FOR: Record<TypographyRole, TypographyVariant[]> = {
  "headline": ["bold"],
  "title":    ["bold"],
  "medium":   ["bold"],
  "body":     ["regular", "bold"],
  "label":    ["regular", "bold", "caps"],
  "xs":       ["regular", "bold"],
};

type ColorOption = { label: string; value: string | undefined };
const COLOR_OPTIONS: ColorOption[] = [
  { label: "default",   value: undefined                 },
  { label: "secondary", value: "var(--text-secondary)"   },
  { label: "brand",     value: "var(--text-brand)"       },
];

// ─── Style reference data ──────────────────────────────────────────────────────

type StyleRow = { prop: string; value: string; cssClass: string; properties: string[] };

const ROLE_TAG: Record<TypographyRole, string> = {
  headline: "h1", title: "h2", medium: "p", body: "p", label: "span", xs: "span",
};

const SIZE_MAP: Record<TypographyRole, string> = {
  headline: "var(--font-headline-size) / var(--font-headline-line-height)",
  title:    "var(--font-title-size) / var(--font-title-line-height)",
  medium:   "var(--font-medium-size) / var(--font-medium-line-height)",
  body:     "var(--font-body-size) / var(--font-body-line-height)",
  label:    "var(--font-label-size) / var(--font-label-line-height)",
  xs:       "var(--font-xs-size) / var(--font-xs-line-height)",
};

const STYLE_ROWS: StyleRow[] = [
  // role rows
  ...ROLES.map(role => ({
    prop:       "role",
    value:      role,
    cssClass:   `<${ROLE_TAG[role]}>`,
    properties: [`font: ${SIZE_MAP[role]}`],
  })),
  // variant rows
  { prop: "variant", value: "regular", cssClass: `.${"{role}"}-regular`, properties: ["font-weight: var(--font-weight-regular)"] },
  { prop: "variant", value: "bold",    cssClass: `.${"{role}"}-bold`,    properties: ["font-weight: var(--font-weight-bold)"]    },
  { prop: "variant", value: "caps",    cssClass: `.label-caps`,          properties: ["font-weight: var(--font-weight-bold)", "text-transform: uppercase", "letter-spacing: var(--letter-spacing-caps)"] },
  // color rows
  { prop: "color", value: "undefined",             cssClass: "(none)",         properties: ["inherits var(--text-primary)"]  },
  { prop: "color", value: "var(--text-secondary)", cssClass: "style override", properties: ["color: var(--text-secondary)"] },
  { prop: "color", value: "var(--text-brand)",     cssClass: "style override", properties: ["color: var(--text-brand)"]     },
];

const STYLE_GROUPS = STYLE_ROWS.reduce<{ prop: string; rows: StyleRow[] }[]>((acc, row) => {
  const last = acc[acc.length - 1];
  if (last && last.prop === row.prop) last.rows.push(row);
  else acc.push({ prop: row.prop, rows: [row] });
  return acc;
}, []);

function isActive(row: StyleRow, role: TypographyRole, variant: TypographyVariant, color: string | undefined): boolean {
  if (row.prop === "role")    return row.value === role;
  if (row.prop === "variant") return row.value === variant;
  if (row.prop === "color")   return row.value === (color ?? "undefined");
  return false;
}

function generateSnippet(role: TypographyRole, variant: TypographyVariant, color: string | undefined): string {
  const variantProp = variant !== "regular" ? `\n  variant="${variant}"` : "";
  const colorProp   = color ? `\n  color="${color}"` : "";
  return `<Text role="${role}"${variantProp}${colorProp}>\n  Sample text\n</Text>`;
}

// ─── Table styles ─────────────────────────────────────────────────────────────

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

// ─── Playground ───────────────────────────────────────────────────────────────

function Playground({ role, onRole, variant, onVariant, color, onColor }: {
  role: TypographyRole;       onRole:    (r: TypographyRole)    => void;
  variant: TypographyVariant; onVariant: (v: TypographyVariant) => void;
  color: string | undefined;  onColor:   (c: string | undefined) => void;
}) {
  const [copied, setCopied] = useState(false);
  const snippet = generateSnippet(role, variant, color);

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <PlaygroundShell
        preview={<Text role={role} variant={variant} color={color}>Sample text</Text>}
        controls={
          <>
            <ControlRow label="Role">
              {ROLES.map(r => (
                <Pill key={r} active={role === r} onClick={() => {
                  onRole(r);
                  // Reset variant if current one isn't available for new role
                  if (!VARIANTS_FOR[r].includes(variant)) onVariant(VARIANTS_FOR[r][0]);
                }}>
                  {r}
                </Pill>
              ))}
            </ControlRow>
            <ControlRow label="Variant">
              {VARIANTS_FOR[role].map(v => (
                <Pill key={v} active={variant === v} onClick={() => onVariant(v)}>{v}</Pill>
              ))}
            </ControlRow>
            <ControlRow label="Color">
              {COLOR_OPTIONS.map(opt => (
                <Pill key={opt.label} active={color === opt.value} onClick={() => onColor(opt.value)}>
                  {opt.label}
                </Pill>
              ))}
            </ControlRow>
          </>
        }
      />

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

function StyleReference({ role, variant, color }: { role: TypographyRole; variant: TypographyVariant; color: string | undefined }) {
  return (
    <div>
      <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
        Base - always applied regardless of props.
      </p>
      <div style={{ marginBottom: "28px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><th style={TH}>Class</th><th style={TH}>Properties</th></tr></thead>
          <tbody>
            <tr>
              <td style={{ ...TD, whiteSpace: "nowrap" }}>
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>.root</code>
              </td>
              <td style={TD}>
                {["font-family: var(--font-sans)", "letter-spacing: var(--letter-spacing-default)"].map(p => (
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
      <div>
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
                const active = isActive(row, role, variant, color);
                return (
                  <tr key={`${prop}-${row.value}`} style={{ backgroundColor: active ? "#F4F4F5" : "transparent" }}>
                    {i === 0 && (
                      <td rowSpan={rows.length} style={{ ...TD, borderRight: "1px solid #F4F4F5", verticalAlign: "middle" }}>
                        <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#EBEBEB", padding: "2px 6px", borderRadius: "4px", whiteSpace: "nowrap" }}>{prop}</code>
                      </td>
                    )}
                    <td style={{ ...TD, whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#09090B" : "#71717A", fontWeight: active ? 700 : 400 }}>{row.value}</span>
                    </td>
                    <td style={{ ...TD, whiteSpace: "nowrap" }}>
                      <code style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#18181B" : "#A1A1AA", backgroundColor: active ? "#E4E4E7" : "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>{row.cssClass}</code>
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

export function TextSection() {
  const [role,    setRole]    = useState<TypographyRole>("body");
  const [variant, setVariant] = useState<TypographyVariant>("regular");
  const [color,   setColor]   = useState<string | undefined>(undefined);

  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Text</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Renders any text using a named role and variant. Role controls scale and HTML tag. Variant controls weight.
          Never apply font styles manually - always use <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>{"<Text role=\"...\" variant=\"...\">"}</code>.
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ flex: "0 0 52%", minWidth: 0, position: "sticky", top: "24px", alignSelf: "flex-start" }}>
          <SectionBlock title="Playground">
            <Playground role={role} onRole={setRole} variant={variant} onVariant={setVariant} color={color} onColor={setColor} />
          </SectionBlock>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionBlock title="Style Reference">
            <StyleReference role={role} variant={variant} color={color} />
          </SectionBlock>
        </div>
      </div>

      <SectionBlock title="Props">
        <PropsTable source={textTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
