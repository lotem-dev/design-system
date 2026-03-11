import { useState } from "react";
import { Button, type ButtonVariant, type ButtonSize } from "../../../components/atoms/Button";
import { CodeBlock } from "../ui/CodeBlock";
import { PreviewBox } from "../ui/PreviewBox";
import { TokenTable } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";

const VARIANTS: ButtonVariant[] = ["primary", "ghost", "destructive"];
const SIZES:    ButtonSize[]    = ["sm", "md"];

export function ButtonSection() {
  const [activeVariant, setActiveVariant] = useState<ButtonVariant>("primary");

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "system-ui" }}>Atom</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "system-ui" }}>Button</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          The primary interactive element. Three variants cover the full range of action hierarchy —
          from the main CTA down to destructive actions. All variants share the same size scale and disabled behavior.
        </p>
      </div>

      {/* Variant preview */}
      <SectionBlock title="Preview — Variants">
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          {VARIANTS.map((v) => (
            <button
              key={v}
              onClick={() => setActiveVariant(v)}
              style={{
                padding: "4px 10px",
                fontSize: "12px",
                fontFamily: "system-ui",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                background: activeVariant === v ? "#18181B" : "#F4F4F5",
                color:      activeVariant === v ? "#FAFAFA"  : "#71717A",
                fontWeight: activeVariant === v ? 600 : 400,
              }}
            >
              {v}
            </button>
          ))}
        </div>
        <PreviewBox align="center">
          <Button variant={activeVariant} size="md">Label</Button>
          <Button variant={activeVariant} size="sm">Label</Button>
          <Button variant={activeVariant} size="md" disabled>Disabled</Button>
        </PreviewBox>
      </SectionBlock>

      {/* All variants side by side */}
      <SectionBlock title="Preview — All Variants">
        <PreviewBox>
          {VARIANTS.map((v) => (
            <Button key={v} variant={v} size="md">{v.charAt(0).toUpperCase() + v.slice(1)}</Button>
          ))}
        </PreviewBox>
      </SectionBlock>

      {/* Sizes */}
      <SectionBlock title="Preview — Sizes">
        <PreviewBox align="center">
          {SIZES.map((s) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <Button variant="primary" size={s}>Label</Button>
              <code style={{ fontSize: "10px", color: "#71717A", fontFamily: "monospace" }}>{s}</code>
            </div>
          ))}
        </PreviewBox>
      </SectionBlock>

      {/* Props */}
      <SectionBlock title="Props">
        <TokenTable rows={[
          { property: "variant",  token: `"primary" | "ghost" | "destructive"`, value: `"primary"`, note: "Visual style" },
          { property: "size",     token: `"sm" | "md"`,                          value: `"md"`,      note: "Height + padding + font size" },
          { property: "disabled", token: "boolean",                               value: "false",     note: "Reduces opacity, blocks click" },
          { property: "onClick",  token: "MouseEvent handler",                    value: "undefined", note: "Click callback" },
          { property: "children", token: "ReactNode",                             value: "required",  note: "Label text or icon + label" },
        ]} />
      </SectionBlock>

      {/* Tokens */}
      <SectionBlock title="Variant Tokens">
        <TokenTable rows={[
          { property: "primary background",       token: "--brand-primary",    value: "var(--purple-500)" },
          { property: "primary color",            token: "--text-invert",      value: "var(--white-100)" },
          { property: "ghost background",         token: "transparent",        value: "—" },
          { property: "ghost color",              token: "--text-primary",     value: "var(--neutral-600)" },
          { property: "ghost border",             token: "--stroke-secondary", value: "var(--neutral-200)" },
          { property: "destructive background",   token: "--error-secondary",  value: "var(--red-100)" },
          { property: "destructive color",        token: "--error-primary",    value: "var(--red-400)" },
        ]} />
      </SectionBlock>

      {/* Usage */}
      <SectionBlock title="Usage">
        <CodeBlock code={`import { Button } from "./components/atoms/Button";

// Primary — main CTA
<Button variant="primary" size="md">Save changes</Button>

// Ghost — secondary action
<Button variant="ghost" size="md">Cancel</Button>

// Destructive — dangerous action
<Button variant="destructive" size="md">Delete</Button>

// Disabled
<Button variant="primary" disabled>Save changes</Button>`} />
      </SectionBlock>
    </div>
  );
}
