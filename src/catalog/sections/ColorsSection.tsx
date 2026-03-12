import { useState, useRef, useLayoutEffect } from "react";
import { SplitPage } from "../ui/SplitPage";

import globalsCss from "../../../styles/globals.css?raw";

const sources = [{ filename: "globals.css", code: globalsCss }];

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function rgbToHex(rgb: string): string {
  const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return "—";
  return "#" + [m[1], m[2], m[3]]
    .map(x => parseInt(x).toString(16).padStart(2, "0"))
    .join("").toUpperCase();
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

const HEADER_STYLE: React.CSSProperties = {
  fontSize: "11px", fontWeight: 600, color: "#A1A1AA",
  textTransform: "uppercase", letterSpacing: "0.06em",
  fontFamily: "'Open Sans', system-ui, sans-serif",
};

function SemanticTableHeader() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "6px 0 10px", borderBottom: "2px solid #E4E4E7", marginBottom: "2px" }}>
      <span style={{ ...HEADER_STYLE, width: "236px", flexShrink: 0 }}>Semantic Token</span>
      <span style={{ ...HEADER_STYLE, width: "160px", flexShrink: 0 }}>Primitive</span>
      <span style={{ ...HEADER_STYLE }}>Hex</span>
    </div>
  );
}

function SemanticRow({ name, pointsTo, theme }: { name: string; pointsTo: string; theme: string }) {
  const swatchRef = useRef<HTMLDivElement>(null);
  const [hex, setHex] = useState("—");

  useLayoutEffect(() => {
    if (swatchRef.current) {
      const color = getComputedStyle(swatchRef.current).backgroundColor;
      setHex(rgbToHex(color));
    }
  }, [theme, name]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "10px 0", borderBottom: "1px solid #F4F4F5" }}>
      <div ref={swatchRef} style={{ width: "20px", height: "20px", borderRadius: "4px", backgroundColor: `var(${name})`, border: "1px solid rgba(0,0,0,0.1)", flexShrink: 0 }} />
      <code style={{ fontSize: "12px", color: "#18181B", width: "220px", flexShrink: 0, fontFamily: "monospace" }}>{name}</code>
      <code style={{ fontSize: "12px", color: "#52525B", width: "160px", flexShrink: 0, fontFamily: "monospace" }}>{pointsTo}</code>
      <code style={{ fontSize: "12px", color: "#A1A1AA", fontFamily: "monospace" }}>{hex}</code>
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

function AccordionSection({ title, open, onToggle, children }: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      marginBottom: "16px",
      border: "1px solid #E4E4E7",
      borderRadius: "8px",
      overflow: "hidden",
    }}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", padding: "16px 20px",
          background: hovered ? "#F4F4F5" : "#FAFAFA",
          border: "none", cursor: "pointer", textAlign: "left",
          transition: "background 0.15s",
        }}
      >
        <span style={{
          fontSize: "13px", fontWeight: 600, color: "#3F3F46",
          textTransform: "uppercase", letterSpacing: "0.08em",
          fontFamily: "'Open Sans', system-ui, sans-serif",
        }}>
          {title}
        </span>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ flexShrink: 0, transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
        >
          <path d="M6 4l4 4-4 4" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div style={{ padding: "20px" }}>
          {children}
        </div>
      )}
    </div>
  );
}

export function ColorsSection() {
  const [primitivesOpen, setPrimitivesOpen] = useState(false);
  const [semanticOpen,   setSemanticOpen]   = useState(false);
  const [semanticTheme,  setSemanticTheme]  = useState<"light" | "dark">("light");

  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>🪨 Foundation</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Colors</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          <strong>Primitives</strong> are the full color palette — every available color, named by hue and shade (<code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>--purple-500</code>, <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>--neutral-200</code>). They are fixed: <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>--purple-500</code> is always <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>#5E32FF</code>, in every theme, no exceptions.
          <br /><br />
          <strong>Semantic tokens</strong> are named by their role in the UI, not their color (<code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>--brand-primary</code>, <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>--text-secondary</code>). They point to a primitive, and that mapping can change per theme — in dark mode, <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>--brand-primary</code> might point to a different shade. Always use semantic tokens in components, never primitives directly, and of course, never raw hex values.
        </p>
      </div>

      <AccordionSection title="Color Primitives" open={primitivesOpen} onToggle={() => setPrimitivesOpen(o => !o)}>
        {PRIMITIVES.map(p => (
          <PrimitiveGroup key={p.family} family={p.family} shades={p.shades} />
        ))}
      </AccordionSection>

      <AccordionSection title="Semantic Tokens" open={semanticOpen} onToggle={() => setSemanticOpen(o => !o)}>
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "2px", padding: "3px", backgroundColor: "#F4F4F5", borderRadius: "8px" }}>
            {(["light", "dark"] as const).map(t => (
              <button
                key={t}
                onClick={() => setSemanticTheme(t)}
                style={{
                  padding: "4px 12px", fontSize: "11px",
                  fontFamily: "'Open Sans', system-ui, sans-serif", fontWeight: 500,
                  cursor: "pointer", border: "none", borderRadius: "6px",
                  backgroundColor: semanticTheme === t ? "#FFFFFF" : "transparent",
                  color: semanticTheme === t ? "#18181B" : "#71717A",
                  boxShadow: semanticTheme === t ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  transition: "all 0.15s",
                }}
              >
                {t === "light" ? "☀ Light" : "☾ Dark"}
              </button>
            ))}
          </div>
        </div>
        <div data-theme={semanticTheme}>
          <SemanticTableHeader />
          {SEMANTIC.map(({ group, tokens }) => (
            <div key={group} style={{ marginBottom: "24px" }}>
              <p style={{ margin: "12px 0 4px", fontSize: "11px", fontWeight: 600, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>{group}</p>
              {tokens.map(t => <SemanticRow key={t.name} name={t.name} pointsTo={t.pointsTo} theme={semanticTheme} />)}
            </div>
          ))}
        </div>
      </AccordionSection>
    </SplitPage>
  );
}
