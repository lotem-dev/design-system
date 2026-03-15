import { useState } from "react";
import { Button, type ButtonVariant, type ButtonSize } from "../../../components/atoms/Button";
import { IconWrapper } from "../../../components/atoms/IconWrapper";
import { IconAdd } from "../../../components/icons/usecases/IconAdd";
import { TokenTable } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import buttonTsx from "../../../components/atoms/Button.tsx?raw";
import buttonCss from "../../../components/atoms/Button.module.css?raw";

const sources = [
  { filename: "Button.tsx",        code: buttonTsx },
  { filename: "Button.module.css", code: buttonCss },
];

const VARIANTS: ButtonVariant[] = ["primary", "ghost", "destructive"];
const SIZES: ButtonSize[]       = ["sm", "md"];
type IconMode = "none" | "start" | "end" | "only";

const ICON_SM = <IconWrapper icon={IconAdd} size="sm" />;

function Playground() {
  const [variant, setVariant]   = useState<ButtonVariant>("primary");
  const [size, setSize]         = useState<ButtonSize>("md");
  const [disabled, setDisabled] = useState(false);
  const [iconMode, setIconMode] = useState<IconMode>("none");

  const isIconOnly = iconMode === "only";

  const preview = isIconOnly ? (
    <Button variant={variant} size={size} disabled={disabled} icon={ICON_SM} ariaLabel="Action" />
  ) : (
    <Button
      variant={variant} size={size} disabled={disabled}
      icon={iconMode !== "none" ? ICON_SM : undefined}
      iconPosition={iconMode === "end" ? "end" : "start"}
    >
      Button
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

  return <PlaygroundShell preview={preview} controls={controls} />;
}

export function ButtonSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>⚛️ Atom</span>
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
        <TokenTable rows={[
          { property: "variant",      token: `"primary" | "ghost" | "destructive"`,  value: `"primary"`, note: "Visual style" },
          { property: "size",         token: `"sm" | "md"`,                           value: `"md"`,      note: "Height + padding + font size" },
          { property: "disabled",     token: "boolean",                               value: "false",     note: "Reduces opacity, blocks click" },
          { property: "icon",         token: "ReactNode",                             value: "—",         note: "Icon element, typically <IconWrapper>" },
          { property: "iconPosition", token: `"start" | "end"`,                       value: `"start"`,   note: "Icon before or after the label" },
          { property: "ariaLabel",    token: "string",                                value: "—",         note: "Optional with children; required without" },
          { property: "type",         token: `"button" | "submit" | "reset"`,         value: `"button"`,  note: "HTML button type — use submit inside forms" },
          { property: "onClick",      token: "(e: MouseEvent) => void",               value: "—",         note: "Click callback" },
          { property: "children",     token: "ReactNode",                             value: "—",         note: "Label text — optional when icon is provided" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Variant Tokens">
        <TokenTable rows={[
          { property: "primary background",     token: "--brand-primary",  value: "var(--purple-500)" },
          { property: "primary color",          token: "--text-invert",    value: "var(--white-100)" },
          { property: "ghost background",       token: "transparent",      value: "—" },
          { property: "ghost color",            token: "--text-primary",   value: "var(--neutral-600)" },
          { property: "destructive background", token: "--error-primary",  value: "var(--red-400)" },
          { property: "destructive color",      token: "--text-invert",    value: "var(--white-100)" },
        ]} />
      </SectionBlock>
    </SplitPage>
  );
}
