import { IconWrapper } from "../../../components/atoms/IconWrapper";
import { IconAdd } from "../../../components/icons/usecases/IconAdd";
import { IconSearch } from "../../../components/icons/usecases/IconSearch";
import { PreviewBox } from "../ui/PreviewBox";
import { TokenTable } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";
import { CodeBlock } from "../ui/CodeBlock";
import { SplitPage } from "../ui/SplitPage";

import iconWrapperTsx from "../../../components/atoms/IconWrapper.tsx?raw";

const sources = [{ filename: "IconWrapper.tsx", code: iconWrapperTsx }];

export function IconWrapperSection() {
  return (
    <SplitPage files={sources}>

      {/* Title */}
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>⚛️ Atom</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>IconWrapper</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          The single way to render any icon in the system. It takes an icon component and outputs it
          at a standardized size. Never render icon SVGs directly - always go through IconWrapper.
        </p>
      </div>

      {/* Sizes preview */}
      <SectionBlock title="Preview - Sizes">
        <PreviewBox align="center">
          {(["xs", "sm", "md", "lg"] as const).map((size) => (
            <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <IconWrapper icon={IconAdd} size={size} style={{ color: "#18181B" }} />
              <code style={{ fontSize: "10px", color: "#71717A", fontFamily: "monospace" }}>{size}</code>
            </div>
          ))}
        </PreviewBox>
      </SectionBlock>

      {/* Color inheritance preview */}
      <SectionBlock title="Preview - Color Inheritance">
        <p style={{ margin: "0 0 12px", fontSize: "13px", color: "#71717A" }}>
          Icons use <code style={{ fontFamily: "monospace", backgroundColor: "#F4F4F5", padding: "1px 4px", borderRadius: "3px" }}>currentColor</code> —
          set <code style={{ fontFamily: "monospace", backgroundColor: "#F4F4F5", padding: "1px 4px", borderRadius: "3px" }}>color</code> on
          the wrapper or any parent element and the icon picks it up automatically.
        </p>
        <PreviewBox>
          {[
            { color: "var(--text-primary)",    label: "text-primary" },
            { color: "var(--brand-primary)",   label: "brand-primary" },
            { color: "var(--error-primary)",   label: "error-primary" },
            { color: "var(--success-primary)", label: "success-primary" },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <IconWrapper icon={IconSearch} size="md" style={{ color }} />
              <code style={{ fontSize: "10px", color: "#A1A1AA", fontFamily: "monospace" }}>{label}</code>
            </div>
          ))}
        </PreviewBox>
      </SectionBlock>

      {/* Usage */}
      <SectionBlock title="Usage">
        <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#71717A", lineHeight: "1.6" }}>
          Import the wrapper and the icon you need. Pass the icon component to the{" "}
          <code style={{ fontFamily: "monospace", backgroundColor: "#F4F4F5", padding: "1px 4px", borderRadius: "3px" }}>icon</code>{" "}
          prop — not an instance, just the component itself (no angle brackets).
        </p>
        <CodeBlock code={`import { IconWrapper } from "@/components/atoms/IconWrapper";
import { IconSearch } from "@/components/icons/usecases/IconSearch";

// Basic usage — defaults to size "lg" (24px)
<IconWrapper icon={IconSearch} />

// With a specific size
<IconWrapper icon={IconSearch} size="md" />

// Color is controlled via CSS, not a prop
<IconWrapper icon={IconSearch} size="md" style={{ color: "var(--brand-primary)" }} />

// For screen readers — add a title when the icon conveys meaning
<IconWrapper icon={IconSearch} size="md" title="Search" />`} />

        <p style={{ margin: "16px 0 0", fontSize: "13px", color: "#71717A", lineHeight: "1.6" }}>
          Do not pass a <code style={{ fontFamily: "monospace", backgroundColor: "#F4F4F5", padding: "1px 4px", borderRadius: "3px" }}>color</code>{" "}
          prop directly — it is intentionally blocked. Use <code style={{ fontFamily: "monospace", backgroundColor: "#F4F4F5", padding: "1px 4px", borderRadius: "3px" }}>style</code>{" "}
          or a CSS class instead.
        </p>
      </SectionBlock>

      {/* Props */}
      <SectionBlock title="Props">
        <TokenTable rows={[
          { property: "icon",      token: "React SVG component",       value: "required",   note: "The icon to render — pass the component, not an instance" },
          { property: "size",      token: `"xs" | "sm" | "md" | "lg"`, value: `"lg"`,       note: "Controls width and height" },
          { property: "title",     token: "string",                     value: "undefined",  note: "Accessible label for screen readers (like alt on an image)" },
          { property: "className", token: "string",                     value: "undefined",  note: "Additional CSS class" },
          { property: "style",     token: "CSSProperties",              value: "undefined",  note: "Use this to set color — color prop is blocked" },
        ]} />
      </SectionBlock>

      {/* Size scale */}
      <SectionBlock title="Size Scale">
        <TokenTable rows={[
          { property: "xs", token: "—", value: "12px", note: "Inline with very small text" },
          { property: "sm", token: "—", value: "16px", note: "Inline with label or body text" },
          { property: "md", token: "—", value: "20px", note: "Default in most UI contexts" },
          { property: "lg", token: "—", value: "24px", note: "Standalone or prominent icons" },
        ]} />
      </SectionBlock>

    </SplitPage>
  );
}
