import { useState } from "react";
import { ChatField } from "../../../components/fields/ChatField";
import { LogoGitHub }   from "../../../components/icons/brand/LogoGitHub";
import { LogoAWS }      from "../../../components/icons/brand/LogoAWS";
import { LogoSlack }    from "../../../components/icons/brand/LogoSlack";
import { LogoShortcut } from "../../../components/icons/brand/LogoShortcut";
import { LogoJira }     from "../../../components/icons/brand/LogoJira";
import { TokenTable }   from "../ui/TokenTable";
import { PropsTable }   from "../ui/PropsTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage }    from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import chatFieldTsx from "../../../components/fields/ChatField.tsx?raw";
import chatFieldCss from "../../../components/fields/ChatField.module.css?raw";

const sources = [
  { filename: "ChatField.tsx",        code: chatFieldTsx },
  { filename: "ChatField.module.css", code: chatFieldCss },
];

const DEMO_CONNECTORS = [LogoGitHub, LogoAWS, LogoSlack, LogoShortcut, LogoJira];

function Playground() {
  const [value, setValue]           = useState("");
  const [isProcessing, setProcess]  = useState(false);
  const [showConnectors, setShow]   = useState(true);

  function handleSend() {
    setProcess(true);
    setTimeout(() => {
      setValue("");
      setProcess(false);
    }, 1500);
  }

  return (
    <PlaygroundShell
      preview={
        <div style={{ width: "100%", maxWidth: "600px" }}>
          <ChatField
            value={value}
            onChange={setValue}
            onSend={handleSend}
            isProcessing={isProcessing}
            connectors={showConnectors ? DEMO_CONNECTORS : []}
            connectorCount={showConnectors ? 8 : 0}
          />
        </div>
      }
      controls={
        <>
          <ControlRow label="Connectors">
            <Pill active={showConnectors}  onClick={() => setShow(true)}>visible</Pill>
            <Pill active={!showConnectors} onClick={() => setShow(false)}>hidden</Pill>
          </ControlRow>
          <ControlRow label="Button state">
            <Pill active={!isProcessing && value === ""}  onClick={() => { setValue(""); setProcess(false); }}>idle</Pill>
            <Pill active={!isProcessing && value !== ""}  onClick={() => { setValue("What are my open findings?"); setProcess(false); }}>has text</Pill>
            <Pill active={isProcessing}                   onClick={() => setProcess(true)}>processing</Pill>
          </ControlRow>
        </>
      }
    />
  );
}

export function ChatFieldSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>ChatField</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          An AI chat input with a brand-colored border, glow ring, and a toolbar row
          (attach file, options, send). A connectors strip beneath it shows which integrations
          are active. The send button activates when text is present, and shows a spinner
          while processing.
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>

      <SectionBlock title="States">
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "600px" }}>
          <div>
            <div style={{ fontSize: "11px", color: "#71717A", marginBottom: "8px", fontFamily: "'Open Sans', system-ui, sans-serif", fontWeight: 600 }}>Empty (idle)</div>
            <ChatField value="" onChange={() => {}} onSend={() => {}} connectors={DEMO_CONNECTORS} connectorCount={8} />
          </div>
          <div>
            <div style={{ fontSize: "11px", color: "#71717A", marginBottom: "8px", fontFamily: "'Open Sans', system-ui, sans-serif", fontWeight: 600 }}>Has text (send active)</div>
            <ChatField value="What are my top open findings?" onChange={() => {}} onSend={() => {}} connectors={DEMO_CONNECTORS} connectorCount={8} />
          </div>
          <div>
            <div style={{ fontSize: "11px", color: "#71717A", marginBottom: "8px", fontFamily: "'Open Sans', system-ui, sans-serif", fontWeight: 600 }}>Processing</div>
            <ChatField value="" onChange={() => {}} onSend={() => {}} isProcessing connectors={DEMO_CONNECTORS} connectorCount={8} />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock title="Props">
        <PropsTable source={chatFieldTsx} />
      </SectionBlock>

      <SectionBlock title="Tokens">
        <TokenTable rows={[
          { property: "card border",      token: "--stroke-brand",     value: "var(--purple-500)" },
          { property: "glow ring",        token: "rgba(94,50,255,.25)", value: "fixed value — matches brand primary at 25% opacity" },
          { property: "send (active)",    token: "--brand-primary",    value: "var(--purple-500)" },
          { property: "send (idle)",      token: "--brand-tertiary",   value: "var(--purple-200)" },
          { property: "strip background", token: "--surface-secondary", value: "var(--neutral-50)" },
          { property: "avatar border",    token: "--stroke-secondary", value: "var(--neutral-200)" },
        ]} />
      </SectionBlock>
    </SplitPage>
  );
}
