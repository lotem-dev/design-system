import { useState } from "react";
import { Button, type ButtonVariant, type ButtonSize } from "../../../components/atoms/Button";
import { IconWrapper } from "../../../components/atoms/IconWrapper";
import { IconAdd } from "../../../components/icons/usecases/IconAdd";
import { IconDelete } from "../../../components/icons/usecases/IconDelete";
import { PreviewBox } from "../ui/PreviewBox";
import { TokenTable } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";
import { CodeBlock } from "../ui/CodeBlock";
import { SplitPage } from "../ui/SplitPage";

import buttonTsx from "../../../components/atoms/Button.tsx?raw";
import buttonCss from "../../../components/atoms/Button.module.css?raw";

const sources = [
  { filename: "Button.tsx",        code: buttonTsx },
  { filename: "Button.module.css", code: buttonCss },
];

const VARIANTS: ButtonVariant[] = ["primary", "ghost", "destructive"];
const SIZES:    ButtonSize[]    = ["sm", "md"];

export function ButtonSection() {
  const [activeVariant, setActiveVariant] = useState<ButtonVariant>("primary");

  return (
    <SplitPage files={sources}>
      {/* Title */}
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>⚛️ Atom</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Button</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          The primary interactive element. Three variants cover the full range of action hierarchy —
          from the main CTA down to destructive actions. Supports text labels, icons, or both.
          All variants share the same size scale and disabled behavior.
        </p>
      </div>

      {/* Variant preview */}
      <SectionBlock title="Preview - Variants">
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          {VARIANTS.map((v) => (
            <button
              key={v}
              onClick={() => setActiveVariant(v)}
              style={{
                padding: "4px 10px",
                fontSize: "12px",
                fontFamily: "'Open Sans', system-ui, sans-serif",
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
      <SectionBlock title="Preview - All Variants">
        <PreviewBox>
          {VARIANTS.map((v) => (
            <Button key={v} variant={v} size="md">{v.charAt(0).toUpperCase() + v.slice(1)}</Button>
          ))}
        </PreviewBox>
      </SectionBlock>

      {/* Sizes */}
      <SectionBlock title="Sizes">
        <PreviewBox align="center">
          {SIZES.map((s) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <Button variant="primary" size={s}>Label</Button>
              <code style={{ fontSize: "10px", color: "#71717A", fontFamily: "monospace" }}>{s}</code>
            </div>
          ))}
        </PreviewBox>
      </SectionBlock>

      {/* Icons */}
      <SectionBlock title="With Icons">
        <PreviewBox align="center">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <Button variant="primary" icon={<IconWrapper icon={IconAdd} size="sm" />} iconPosition="start">Add item</Button>
            <code style={{ fontSize: "10px", color: "#71717A", fontFamily: "monospace" }}>icon start</code>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <Button variant="ghost" icon={<IconWrapper icon={IconAdd} size="sm" />} iconPosition="end">Add item</Button>
            <code style={{ fontSize: "10px", color: "#71717A", fontFamily: "monospace" }}>icon end</code>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <Button variant="ghost" icon={<IconWrapper icon={IconAdd} size="sm" />} ariaLabel="Add item" />
            <code style={{ fontSize: "10px", color: "#71717A", fontFamily: "monospace" }}>icon only</code>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <Button variant="destructive" icon={<IconWrapper icon={IconDelete} size="sm" />} ariaLabel="Delete" />
            <code style={{ fontSize: "10px", color: "#71717A", fontFamily: "monospace" }}>destructive icon only</code>
          </div>
        </PreviewBox>
      </SectionBlock>

      {/* Usage */}
      <SectionBlock title="Usage">
        <CodeBlock code={`import { Button } from "@/atoms/Button";
import { IconWrapper } from "@/atoms/IconWrapper";
import { IconAdd } from "@/icons/usecases/IconAdd";

// Text only
<Button variant="primary">Save changes</Button>

// Icon + label
<Button
  variant="ghost"
  icon={<IconWrapper icon={IconAdd} size="sm" />}
  iconPosition="start"
>
  Add item
</Button>

// Icon only — ariaLabel is required by TypeScript
<Button
  variant="ghost"
  icon={<IconWrapper icon={IconAdd} size="sm" />}
  ariaLabel="Add item"
/>

// Inside a form
<Button type="submit" variant="primary">Submit</Button>

// Disabled
<Button variant="primary" disabled>Saving…</Button>`} />
      </SectionBlock>

      {/* Props */}
      <SectionBlock title="Props">
        <TokenTable rows={[
          { property: "variant",       token: `"primary" | "ghost" | "destructive"`, value: `"primary"`,  note: "Visual style" },
          { property: "size",          token: `"sm" | "md"`,                          value: `"md"`,       note: "Height + padding + font size" },
          { property: "disabled",      token: "boolean",                              value: "false",      note: "Reduces opacity, blocks click" },
          { property: "icon",          token: "ReactNode",                            value: "undefined",  note: "Icon element, typically <IconWrapper>" },
          { property: "iconPosition",  token: `"start" | "end"`,                      value: `"start"`,   note: "Icon before or after the label" },
          { property: "ariaLabel",     token: "string",                               value: "undefined",  note: "Required by TypeScript when no children" },
          { property: "type",          token: `"button" | "submit" | "reset"`,        value: `"button"`,  note: "HTML button type — use submit inside forms" },
          { property: "onClick",       token: "MouseEvent handler",                   value: "undefined",  note: "Click callback" },
          { property: "children",      token: "ReactNode",                            value: "undefined",  note: "Label text — optional if icon is provided" },
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
          { property: "destructive background",   token: "--error-primary",    value: "var(--red-400)" },
          { property: "destructive color",        token: "--text-invert",      value: "var(--white-100)" },
        ]} />
      </SectionBlock>
    </SplitPage>
  );
}
