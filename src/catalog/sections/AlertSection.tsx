import { useState } from "react";
import { Alert } from "../../../components/overlays/Alert";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import alertTsx from "../../../components/overlays/Alert.tsx?raw";
import alertCss from "../../../components/overlays/Alert.module.css?raw";

const sources = [
  { filename: "Alert.tsx",        code: alertTsx },
  { filename: "Alert.module.css", code: alertCss },
];

type AlertType = "info" | "success" | "warning" | "error";
const TYPES: AlertType[] = ["info", "success", "warning", "error"];

function Playground() {
  const [type, setType]         = useState<AlertType>("info");
  const [showTitle, setShowTitle] = useState(true);
  const [closable, setClosable]   = useState(false);

  return (
    <PlaygroundShell
      preview={
        <div style={{ width: "340px" }}>
          <Alert
            type={type}
            title={showTitle ? "Heads up" : undefined}
            message="This is an inline alert message giving the user important context about the current state."
            onClose={closable ? () => {} : undefined}
          />
        </div>
      }
      controls={
        <>
          <ControlRow label="Type">
            {TYPES.map(t => <Pill key={t} active={type === t} onClick={() => setType(t)}>{t}</Pill>)}
          </ControlRow>
          <ControlRow label="Title">
            <Pill active={showTitle}  onClick={() => setShowTitle(true)}>show</Pill>
            <Pill active={!showTitle} onClick={() => setShowTitle(false)}>hide</Pill>
          </ControlRow>
          <ControlRow label="Closable">
            <Pill active={!closable} onClick={() => setClosable(false)}>no</Pill>
            <Pill active={closable}  onClick={() => setClosable(true)}>yes</Pill>
          </ControlRow>
        </>
      }
    />
  );
}

export function AlertSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Alert</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          An inline message that stays visible on the page. Use for confirmations, warnings, and errors that the user needs to see and act on — unlike Toast, Alert doesn't disappear.
        </p>
      </div>
      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
      <SectionBlock title="Props">
        <PropsTable source={alertTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
