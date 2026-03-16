import { useState } from "react";
import { Spinner } from "../../../components/atoms/Spinner";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import spinnerTsx from "../../../components/atoms/Spinner.tsx?raw";
import spinnerCss from "../../../components/atoms/Spinner.module.css?raw";

const sources = [
  { filename: "Spinner.tsx",        code: spinnerTsx },
  { filename: "Spinner.module.css", code: spinnerCss },
];

type SpinnerSize = "sm" | "md" | "lg";
const SIZES: SpinnerSize[] = ["sm", "md", "lg"];

function Playground() {
  const [size, setSize] = useState<SpinnerSize>("md");

  return (
    <PlaygroundShell
      preview={<Spinner size={size} />}
      controls={
        <ControlRow label="Size">
          {SIZES.map(s => <Pill key={s} active={size === s} onClick={() => setSize(s)}>{s}</Pill>)}
        </ControlRow>
      }
    />
  );
}

export function SpinnerSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Feedback</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Spinner</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          An animated loading indicator for in-progress states. Use while content is fetching or an action hasn't resolved yet.
        </p>
      </div>
      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
      <SectionBlock title="Props">
        <PropsTable source={spinnerTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
