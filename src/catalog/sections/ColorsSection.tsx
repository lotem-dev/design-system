import { SectionBlock } from "../ui/SectionBlock";

// ─── Primitive palette (never change between themes) ──────────────────────────

const PRIMITIVES: { family: string; shades: { name: string; value: string }[] }[] = [
  { family: "Neutrals",  shades: [{ name: "--neutral-50",  value: "#F8FAFC" },{ name: "--neutral-100", value: "#F1F5F9" },{ name: "--neutral-200", value: "#E2E8F0" },{ name: "--neutral-300", value: "#CBD5E1" },{ name: "--neutral-400", value: "#94A3B8" },{ name: "--neutral-500", value: "#64748B" },{ name: "--neutral-600", value: "#475569" },{ name: "--neutral-700", value: "#2B3749" },{ name: "--neutral-800", value: "#192232" },{ name: "--neutral-900", value: "#0C1324" }] },
  { family: "Purple",    shades: [{ name: "--purple-50",   value: "#F3F0FF" },{ name: "--purple-100",  value: "#C8BBF9" },{ name: "--purple-200",  value: "#A187FF" },{ name: "--purple-300",  value: "#7E5BFF" },{ name: "--purple-400",  value: "#6C44FF" },{ name: "--purple-500",  value: "#5E32FF" },{ name: "--purple-600",  value: "#3C18C3" },{ name: "--purple-700",  value: "#2A0D95" },{ name: "--purple-800",  value: "#1F0779" },{ name: "--purple-900",  value: "#140061" }] },
  { family: "Pink",      shades: [{ name: "--pink-50",     value: "#FEEBF5" },{ name: "--pink-100",    value: "#FACAE6" },{ name: "--pink-200",    value: "#E4A3C8" },{ name: "--pink-300",    value: "#DD88B8" },{ name: "--pink-400",    value: "#D56EA9" },{ name: "--pink-500",    value: "#CD5499" },{ name: "--pink-600",    value: "#C63989" },{ name: "--pink-700",    value: "#AB3277" },{ name: "--pink-800",    value: "#912A65" },{ name: "--pink-900",    value: "#772252" }] },
  { family: "Red",       shades: [{ name: "--red-50",      value: "#FFF5F5" },{ name: "--red-100",     value: "#FFE3E6" },{ name: "--red-200",     value: "#FFBBC0" },{ name: "--red-300",     value: "#FF8A8E" },{ name: "--red-400",     value: "#F64E56" },{ name: "--red-500",     value: "#D1002A" },{ name: "--red-600",     value: "#B00025" },{ name: "--red-700",     value: "#8E0021" },{ name: "--red-800",     value: "#6C001A" },{ name: "--red-900",     value: "#4C0012" }] },
  { family: "Orange",    shades: [{ name: "--orange-50",   value: "#FFF6ED" },{ name: "--orange-100",  value: "#FFEAD5" },{ name: "--orange-200",  value: "#FDD1AA" },{ name: "--orange-300",  value: "#FCB37E" },{ name: "--orange-400",  value: "#FD9B5F" },{ name: "--orange-500",  value: "#FE8235" },{ name: "--orange-600",  value: "#DE6D25" },{ name: "--orange-700",  value: "#C4622B" },{ name: "--orange-800",  value: "#A14F22" },{ name: "--orange-900",  value: "#7E3D1A" }] },
  { family: "Yellow",    shades: [{ name: "--yellow-50",   value: "#FFFBEA" },{ name: "--yellow-100",  value: "#FEF3C7" },{ name: "--yellow-200",  value: "#FDE68A" },{ name: "--yellow-300",  value: "#FCD34D" },{ name: "--yellow-400",  value: "#FBBF24" },{ name: "--yellow-500",  value: "#DCA600" },{ name: "--yellow-600",  value: "#B78C00" },{ name: "--yellow-700",  value: "#947300" },{ name: "--yellow-800",  value: "#755B00" },{ name: "--yellow-900",  value: "#574300" }] },
  { family: "Green",     shades: [{ name: "--green-50",    value: "#ECFDF8" },{ name: "--green-100",   value: "#C6F7EE" },{ name: "--green-200",   value: "#93E8DA" },{ name: "--green-300",   value: "#5ED2AB" },{ name: "--green-400",   value: "#2EB792" },{ name: "--green-500",   value: "#0A8A6C" },{ name: "--green-600",   value: "#066F5E" },{ name: "--green-700",   value: "#045855" },{ name: "--green-800",   value: "#033F3D" },{ name: "--green-900",   value: "#022C2A" }] },
];

// ─── Semantic tokens (values change per theme) ────────────────────────────────

const SEMANTIC: { group: string; tokens: { name: string; pointsTo: string }[] }[] = [
  { group: "Brand",   tokens: [{ name: "--brand-primary", pointsTo: "--purple-500" },{ name: "--brand-secondary", pointsTo: "--purple-600" },{ name: "--brand-tertiary", pointsTo: "--purple-200" }] },
  { group: "Surface", tokens: [{ name: "--surface-primary", pointsTo: "--white-100" },{ name: "--surface-secondary", pointsTo: "--neutral-50" },{ name: "--surface-tertiary", pointsTo: "--neutral-200" }] },
  { group: "Fill",    tokens: [{ name: "--fill-background", pointsTo: "--neutral-100" },{ name: "--fill-sidebar", pointsTo: "--neutral-700" },{ name: "--fill-tooltip", pointsTo: "--neutral-900" }] },
  { group: "Text",    tokens: [{ name: "--text-brand", pointsTo: "--purple-500" },{ name: "--text-primary", pointsTo: "--neutral-600" },{ name: "--text-secondary", pointsTo: "--neutral-400" },{ name: "--text-invert", pointsTo: "--white-100" }] },
  { group: "Stroke",  tokens: [{ name: "--stroke-brand", pointsTo: "--purple-500" },{ name: "--stroke-primary", pointsTo: "--neutral-500" },{ name: "--stroke-secondary", pointsTo: "--neutral-200" },{ name: "--stroke-invert", pointsTo: "--white-100" }] },
  { group: "Divider", tokens: [{ name: "--divider-primary", pointsTo: "--neutral-200" },{ name: "--divider-secondary", pointsTo: "--neutral-600" }] },
  { group: "Status",  tokens: [{ name: "--status-open-primary", pointsTo: "--red-500" },{ name: "--status-open-secondary", pointsTo: "--red-200" },{ name: "--status-fixed-primary", pointsTo: "--green-500" },{ name: "--status-fixed-secondary", pointsTo: "--green-100" },{ name: "--status-ignored-primary", pointsTo: "--neutral-400" },{ name: "--status-ignored-secondary", pointsTo: "--neutral-50" }] },
  { group: "Severity Scale", tokens: [{ name: "--scale-critical-primary", pointsTo: "--red-500" },{ name: "--scale-critical-secondary", pointsTo: "--red-200" },{ name: "--scale-high-primary", pointsTo: "--orange-600" },{ name: "--scale-high-secondary", pointsTo: "--orange-200" },{ name: "--scale-medium-primary", pointsTo: "--yellow-500" },{ name: "--scale-medium-secondary", pointsTo: "--yellow-100" },{ name: "--scale-low-primary", pointsTo: "--green-500" },{ name: "--scale-low-secondary", pointsTo: "--green-100" }] },
  { group: "Alerts",  tokens: [{ name: "--success-primary", pointsTo: "--green-600" },{ name: "--success-secondary", pointsTo: "--green-200" },{ name: "--warning-primary", pointsTo: "--yellow-500" },{ name: "--warning-secondary", pointsTo: "--yellow-50" },{ name: "--error-primary", pointsTo: "--red-400" },{ name: "--error-secondary", pointsTo: "--red-100" }] },
];

// Reads the live computed hex value from the current theme on document root
function liveValue(tokenName: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim() || "—";
}

// ─── Components ───────────────────────────────────────────────────────────────

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "88px" }}>
      <div style={{ width: "100%", height: "40px", borderRadius: "6px", backgroundColor: value, border: "1px solid rgba(0,0,0,0.08)" }} />
      <span style={{ fontSize: "10px", color: "#52525B", wordBreak: "break-all", lineHeight: "1.4", fontFamily: "monospace" }}>{name}</span>
      <span style={{ fontSize: "10px", color: "#A1A1AA", fontFamily: "monospace" }}>{value}</span>
    </div>
  );
}

function SemanticRow({ name, pointsTo }: { name: string; pointsTo: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "10px 0", borderBottom: "1px solid #F4F4F5" }}>
      {/* Swatch uses CSS var directly — auto-updates when theme changes */}
      <div style={{ width: "20px", height: "20px", borderRadius: "4px", backgroundColor: `var(${name})`, border: "1px solid rgba(0,0,0,0.1)", flexShrink: 0 }} />
      <code style={{ fontSize: "12px", color: "#18181B", width: "220px", flexShrink: 0, fontFamily: "monospace" }}>{name}</code>
      <span style={{ fontSize: "11px", color: "#A1A1AA" }}>→</span>
      <code style={{ fontSize: "12px", color: "#52525B", width: "160px", flexShrink: 0, fontFamily: "monospace" }}>{pointsTo}</code>
      {/* Live hex from getComputedStyle — updates on re-render when theme prop changes */}
      <code style={{ fontSize: "12px", color: "#A1A1AA", fontFamily: "monospace" }}>{liveValue(name)}</code>
    </div>
  );
}

function PrimitiveGroup({ family, shades }: { family: string; shades: { name: string; value: string }[] }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <p style={{ margin: "0 0 12px", fontSize: "11px", fontWeight: 600, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>{family}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        {shades.map(s => <Swatch key={s.name} name={s.name} value={s.value} />)}
      </div>
    </div>
  );
}

// theme prop received just to trigger a re-render when theme changes
export function ColorsSection({ theme }: { theme?: string }) {
  void theme;
  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Foundation</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Colors</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          The color system has two layers. <strong>Primitives</strong> are raw hex values — never used directly in components.
          <strong> Semantic tokens</strong> point to primitives and carry meaning. Always use semantic tokens.
          Semantic swatches and hex values update live when you switch themes.
        </p>
      </div>

      <SectionBlock title="Color Primitives">
        {PRIMITIVES.map(p => <PrimitiveGroup key={p.family} family={p.family} shades={p.shades} />)}
      </SectionBlock>

      <SectionBlock title="Semantic Tokens — live for current theme">
        <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#71717A" }}>
          Toggle the theme to see the swatch colors and hex values update in real time.
        </p>
        {SEMANTIC.map(({ group, tokens }) => (
          <div key={group} style={{ marginBottom: "24px" }}>
            <p style={{ margin: "0 0 4px", fontSize: "11px", fontWeight: 600, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>{group}</p>
            {tokens.map(t => <SemanticRow key={t.name} name={t.name} pointsTo={t.pointsTo} />)}
          </div>
        ))}
      </SectionBlock>
    </div>
  );
}
