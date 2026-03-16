import { useState } from "react";
import { Modal } from "../../../components/atoms/Modal";
import { Button } from "../../../components/atoms/Button";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import modalTsx from "../../../components/atoms/Modal.tsx?raw";
import modalCss from "../../../components/atoms/Modal.module.css?raw";

const sources = [
  { filename: "Modal.tsx",        code: modalTsx },
  { filename: "Modal.module.css", code: modalCss },
];

const SIZES = ["sm", "md", "lg"] as const;
type ModalSize = typeof SIZES[number];

function Playground() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<ModalSize>("md");

  return (
    <PlaygroundShell
      preview={
        <>
          <Button variant="primary" onClick={() => setOpen(true)}>Open Modal</Button>
          <Modal open={open} onClose={() => setOpen(false)} title="Confirm action" size={size}>
            <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#52525B", lineHeight: "1.6", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
              This is the modal body. You can put a form, confirmation message, or any content here.
            </p>
            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
            </div>
          </Modal>
        </>
      }
      controls={
        <ControlRow label="Size">
          {SIZES.map(s => <Pill key={s} active={size === s} onClick={() => setSize(s)}>{s}</Pill>)}
        </ControlRow>
      }
    />
  );
}

export function ModalSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Overlay</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Modal</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A dialog that appears over the page to focus the user's attention on a single task. The backdrop dims the rest of the UI. Click outside or the x button to close.
        </p>
      </div>
      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
      <SectionBlock title="Props">
        <PropsTable source={modalTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
