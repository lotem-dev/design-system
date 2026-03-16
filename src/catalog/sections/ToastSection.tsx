import { useState } from "react";
import { Toast } from "../../../components/overlays/Toast";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import toastTsx from "../../../components/overlays/Toast.tsx?raw";
import toastCss from "../../../components/overlays/Toast.module.css?raw";

const sources = [
  { filename: "Toast.tsx",        code: toastTsx },
  { filename: "Toast.module.css", code: toastCss },
];

const TYPES = ["info", "success", "warning", "error"] as const;
type ToastType = typeof TYPES[number];

function Playground() {
  const [visible, setVisible] = useState(true);
  const [type, setType] = useState<ToastType>("success");
  const [dismissable, setDismissable] = useState(true);

  return (
    <PlaygroundShell
      preview={
        <div style={{ position: "relative", minHeight: "64px" }}>
          <Toast
            message="Your changes have been saved."
            type={type}
            visible={visible}
            onClose={dismissable ? () => setVisible(false) : undefined}
          />
          {!visible && (
            <button
              onClick={() => setVisible(true)}
              style={{ fontSize: "13px", color: "#5E32FF", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "'Open Sans', system-ui, sans-serif" }}
            >
              Show again
            </button>
          )}
        </div>
      }
      controls={
        <>
          <ControlRow label="Type">
            {TYPES.map(t => <Pill key={t} active={type === t} onClick={() => { setType(t); setVisible(true); }}>{t}</Pill>)}
          </ControlRow>
          <ControlRow label="Dismissable">
            <Pill active={dismissable}  onClick={() => setDismissable(true)}>yes</Pill>
            <Pill active={!dismissable} onClick={() => setDismissable(false)}>no</Pill>
          </ControlRow>
        </>
      }
    />
  );
}

export function ToastSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Toast</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A brief notification that floats over the UI. Unlike Alert, Toast is transient — use it for non-blocking feedback like "Saved", "Copied", or action confirmations.
        </p>
      </div>
      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
      <SectionBlock title="Props">
        <PropsTable source={toastTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
