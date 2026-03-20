import { useState } from "react";
import { Skeleton } from "../../../components/visualization/Skeleton";
import { PropsTable } from "../ui/PropsTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import skeletonTsx from "../../../components/visualization/Skeleton.tsx?raw";
import skeletonCss from "../../../components/visualization/Skeleton.module.css?raw";

const sources = [
  { filename: "Skeleton.tsx",        code: skeletonTsx },
  { filename: "Skeleton.module.css", code: skeletonCss },
];

type SkeletonVariant = "text" | "circle" | "rect";
const VARIANTS: SkeletonVariant[] = ["text", "circle", "rect"];

// ─── Style Reference ──────────────────────────────────────────────────────────

type StyleRow = {
  prop:       string;
  value:      string;
  cssClass:   string;
  properties: string[];
};

const STYLE_ROWS: StyleRow[] = [
  { prop: "variant",  value: "text",   cssClass: ".text",   properties: ["border-radius: var(--radius-xs)"] },
  { prop: "variant",  value: "circle", cssClass: ".circle", properties: ["border-radius: 50%"] },
  { prop: "variant",  value: "rect",   cssClass: ".rect",   properties: ["border-radius: 0"] },
  { prop: "animated", value: "true",   cssClass: ".animated", properties: ["background: linear-gradient shimmer", "background-size: 800px 100%", "animation: shimmer 1.4s ease-in-out infinite"] },
  { prop: "animated", value: "false",  cssClass: "(none)",    properties: ["no animation class applied"] },
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
  padding: "10px 12px", verticalAlign: "top", borderBottom: "1px solid #F4F4F5",
};

type ActiveState = { variant: SkeletonVariant; animated: boolean };

function isActive({ prop, value }: StyleRow, state: ActiveState): boolean {
  if (prop === "variant")  return value === state.variant;
  if (prop === "animated") return value === String(state.animated);
  return false;
}

function StyleReference(state: ActiveState) {
  return (
    <div>
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
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>.root</code>
              </td>
              <td style={TD}>
                {["background: var(--surface-tertiary)", "display: block"].map(p => (
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

// ─── Playground ───────────────────────────────────────────────────────────────

function FakeListItem({ animated }: { animated: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Skeleton variant="circle" width={36} height={36} animated={animated} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
        <Skeleton variant="text" width="60%" height={12} animated={animated} />
        <Skeleton variant="text" width="90%" height={12} animated={animated} />
      </div>
    </div>
  );
}

type PlaygroundProps = {
  variant:  SkeletonVariant; onVariant:  (v: SkeletonVariant) => void;
  animated: boolean;         onAnimated: (a: boolean)         => void;
};

function Playground({ variant, onVariant, animated, onAnimated }: PlaygroundProps) {
  const [copied, setCopied] = useState(false);
  const snippet = `<Skeleton variant="${variant}" animated={${animated}} width={120} height={variant === "circle" ? 40 : 16} />`;

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <PlaygroundShell
        preview={
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "280px" }}>
            <Skeleton
              variant={variant}
              width={variant === "circle" ? 48 : "100%"}
              height={variant === "circle" ? 48 : 20}
              animated={animated}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <FakeListItem animated={animated} />
              <FakeListItem animated={animated} />
              <FakeListItem animated={animated} />
            </div>
          </div>
        }
        controls={
          <>
            <ControlRow label="Variant">
              {VARIANTS.map(v => <Pill key={v} active={variant === v} onClick={() => onVariant(v)}>{v}</Pill>)}
            </ControlRow>
            <ControlRow label="Animated">
              <Pill active={animated}  onClick={() => onAnimated(true)}>yes</Pill>
              <Pill active={!animated} onClick={() => onAnimated(false)}>no</Pill>
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

// ─── Section ──────────────────────────────────────────────────────────────────

export function SkeletonSection() {
  const [variant, setVariant]   = useState<SkeletonVariant>("text");
  const [animated, setAnimated] = useState(true);

  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Skeleton</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A placeholder that mimics the shape of real content while it's loading. Prevents blank screens and reduces perceived wait time.
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ flex: "0 0 52%", minWidth: 0, position: "sticky", top: "24px", alignSelf: "flex-start" }}>
          <SectionBlock title="Playground">
            <Playground variant={variant} onVariant={setVariant} animated={animated} onAnimated={setAnimated} />
          </SectionBlock>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionBlock title="Style Reference">
            <StyleReference variant={variant} animated={animated} />
          </SectionBlock>
        </div>
      </div>

      <SectionBlock title="Props">
        <PropsTable source={skeletonTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
