import { useState } from "react";
import { IconWrapper, type IconSize } from "../../../components/atoms/IconWrapper";
import { IconSearch } from "../../../components/icons/usecases/IconSearch";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import iconWrapperTsx from "../../../components/atoms/IconWrapper.tsx?raw";

const sources = [{ filename: "IconWrapper.tsx", code: iconWrapperTsx }];

const SIZES: IconSize[]  = ["xs", "sm", "md", "lg"];
const COLORS = [
  { label: "default",       value: "var(--text-primary)"    },
  { label: "brand",         value: "var(--brand-primary)"   },
  { label: "error",         value: "var(--error-primary)"   },
  { label: "success",       value: "var(--success-primary)" },
];

function Playground() {
  const [size, setSize]   = useState<IconSize>("md");
  const [color, setColor] = useState(COLORS[0].value);

  return (
    <PlaygroundShell
      preview={<IconWrapper icon={IconSearch} size={size} style={{ color }} />}
      controls={
        <>
          <ControlRow label="Size">
            {SIZES.map(s => <Pill key={s} active={size === s} onClick={() => setSize(s)}>{s}</Pill>)}
          </ControlRow>
          <ControlRow label="Color">
            {COLORS.map(c => (
              <Pill key={c.label} active={color === c.value} onClick={() => setColor(c.value)}>{c.label}</Pill>
            ))}
          </ControlRow>
        </>
      }
    />
  );
}

export function IconWrapperSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>⚛️ Atom</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>IconWrapper</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          The single way to render any icon in the system. Takes an icon component and outputs it
          at a standardized size. Never render icon SVGs directly — always go through IconWrapper.
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
    </SplitPage>
  );
}
