import React, { useState } from "react";
import { EmptyState } from "../../../components/visualization/EmptyState";
import { Button } from "../../../components/interactions/Button";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import emptyStateTsx from "../../../components/visualization/EmptyState.tsx?raw";
import emptyStateCss from "../../../components/visualization/EmptyState.module.css?raw";

const sources = [
  { filename: "EmptyState.tsx",        code: emptyStateTsx },
  { filename: "EmptyState.module.css", code: emptyStateCss },
];

const INPUT_STYLE: React.CSSProperties = {
  padding: "4px 10px", fontSize: "12px",
  fontFamily: "'Open Sans', system-ui, sans-serif",
  border: "1px solid #E4E4E7", borderRadius: "6px",
  color: "#09090B", background: "#FFFFFF",
  outline: "none", width: "200px",
};

function Playground() {
  const [title, setTitle]           = useState("No findings yet");
  const [description, setDescription] = useState("Run a scan to see your first results here.");
  const [actionLabel, setActionLabel] = useState("Run scan");
  const [showDesc, setShowDesc]     = useState(true);
  const [showAction, setShowAction] = useState(true);
  const [copied, setCopied]         = useState(false);

  function generateSnippet() {
    const lines = [`<EmptyState`, `  title="${title}"`];
    if (showDesc) lines.push(`  description="${description}"`);
    if (showAction) lines.push(`  action={<Button variant="primary">${actionLabel}</Button>}`);
    lines.push(`/>`);
    return lines.join("\n");
  }
  const snippet = generateSnippet();

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
    <PlaygroundShell
      preview={
        <EmptyState
          title={title}
          description={showDesc ? description : undefined}
          action={showAction ? <Button variant="primary">{actionLabel}</Button> : undefined}
        />
      }
      controls={
        <>
          <ControlRow label="Title">
            <input value={title} onChange={e => setTitle(e.target.value)} style={INPUT_STYLE} />
          </ControlRow>
          <ControlRow label="Description">
            <Pill active={showDesc}  onClick={() => setShowDesc(true)}>show</Pill>
            <Pill active={!showDesc} onClick={() => setShowDesc(false)}>hide</Pill>
          </ControlRow>
          {showDesc && (
            <ControlRow label="Desc text">
              <input value={description} onChange={e => setDescription(e.target.value)} style={INPUT_STYLE} />
            </ControlRow>
          )}
          <ControlRow label="Action">
            <Pill active={showAction}  onClick={() => setShowAction(true)}>show</Pill>
            <Pill active={!showAction} onClick={() => setShowAction(false)}>hide</Pill>
          </ControlRow>
          {showAction && (
            <ControlRow label="Action label">
              <input value={actionLabel} onChange={e => setActionLabel(e.target.value)} style={INPUT_STYLE} />
            </ControlRow>
          )}
        </>
      }
    />

    <div style={{ marginTop: "12px" }}>
      <div style={{ position: "relative" }}>
        <pre style={{
          margin: 0, padding: "14px 52px 14px 16px",
          backgroundColor: "#18181B", borderRadius: "8px",
          fontSize: "12px", fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          color: "#E4E4E7", lineHeight: "1.7", overflowX: "auto", whiteSpace: "pre",
        }}>
          {snippet}
        </pre>
        <button onClick={copy} style={{
          position: "absolute", top: "10px", right: "10px",
          padding: "3px 10px", fontSize: "11px",
          fontFamily: "'Open Sans', system-ui, sans-serif", fontWeight: 600,
          color: copied ? "#A1A1AA" : "#71717A",
          backgroundColor: "#27272A", border: "1px solid #3F3F46",
          borderRadius: "5px", cursor: "pointer", transition: "color 0.15s",
        }}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
    </>
  );
}

export function EmptyStateSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
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
