import { useState } from "react";
import { Link } from "../../../components/atoms/Link";
import { Text } from "../../../components/typography/Text";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import linkTsx from "../../../components/atoms/Link.tsx?raw";

const sources = [
  { filename: "Link.tsx", code: linkTsx },
];

const COLORS = [
  { label: "brand",     value: "var(--brand-primary)"  },
  { label: "secondary", value: "var(--text-secondary)"  },
];

function Playground() {
  const [colorIdx, setColorIdx] = useState(0);
  const [external, setExternal] = useState(false);

  return (
    <PlaygroundShell
      preview={
        <Link href="#" colorToken={COLORS[colorIdx].value} external={external}>
          <Text role="body-regular">Visit the docs{external ? " ↗" : ""}</Text>
        </Link>
      }
      controls={
        <>
          <ControlRow label="Color">
            {COLORS.map((c, i) => (
              <Pill key={c.label} active={colorIdx === i} onClick={() => setColorIdx(i)}>{c.label}</Pill>
            ))}
          </ControlRow>
          <ControlRow label="External">
            <Pill active={!external} onClick={() => setExternal(false)}>no</Pill>
            <Pill active={external}  onClick={() => setExternal(true)}>yes</Pill>
          </ControlRow>
        </>
      }
    />
  );
}

export function LinkSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>⚛️ Atom</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Link</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A semantic anchor element. Handles interaction behavior (hover underline, focus ring, external tab safety)
          but does not control typography — wrap children in a <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>{"<Text>"}</code> component for that.
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
    </SplitPage>
  );
}
