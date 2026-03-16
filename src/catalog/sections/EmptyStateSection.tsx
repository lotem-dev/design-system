import { useState } from "react";
import { EmptyState } from "../../../components/atoms/EmptyState";
import { Button } from "../../../components/atoms/Button";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import emptyStateTsx from "../../../components/atoms/EmptyState.tsx?raw";
import emptyStateCss from "../../../components/atoms/EmptyState.module.css?raw";

const sources = [
  { filename: "EmptyState.tsx",        code: emptyStateTsx },
  { filename: "EmptyState.module.css", code: emptyStateCss },
];

function Playground() {
  const [showDesc, setShowDesc] = useState(true);
  const [showAction, setShowAction] = useState(true);

  return (
    <PlaygroundShell
      preview={
        <EmptyState
          title="No findings yet"
          description={showDesc ? "Run a scan to see your first results here." : undefined}
          action={showAction ? <Button variant="primary">Run scan</Button> : undefined}
        />
      }
      controls={
        <>
          <ControlRow label="Description">
            <Pill active={showDesc}  onClick={() => setShowDesc(true)}>show</Pill>
            <Pill active={!showDesc} onClick={() => setShowDesc(false)}>hide</Pill>
          </ControlRow>
          <ControlRow label="Action">
            <Pill active={showAction}  onClick={() => setShowAction(true)}>show</Pill>
            <Pill active={!showAction} onClick={() => setShowAction(false)}>hide</Pill>
          </ControlRow>
        </>
      }
    />
  );
}

export function EmptyStateSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Feedback</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Empty State</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Shown when a list or table has no items. Guides the user toward the next action instead of leaving a blank screen. Use in tables, dashboards, and filtered views.
        </p>
      </div>
      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
      <SectionBlock title="Props">
        <PropsTable source={emptyStateTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
