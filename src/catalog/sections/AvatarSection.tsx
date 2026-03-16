import { useState } from "react";
import { Avatar } from "../../../components/layout/Avatar";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import avatarTsx from "../../../components/layout/Avatar.tsx?raw";
import avatarCss from "../../../components/layout/Avatar.module.css?raw";

const sources = [
  { filename: "Avatar.tsx",        code: avatarTsx },
  { filename: "Avatar.module.css", code: avatarCss },
];

type AvatarSize = "xs" | "sm" | "md" | "lg";
const SIZES: AvatarSize[] = ["xs", "sm", "md", "lg"];

function Playground() {
  const [size, setSize] = useState<AvatarSize>("md");

  return (
    <PlaygroundShell
      preview={
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Avatar name="Lotem Eldar" size={size} />
          <Avatar name="Sam Lee" src="https://i.pravatar.cc/80?img=3" size={size} />
          <Avatar name="A" size={size} />
        </div>
      }
      controls={
        <ControlRow label="Size">
          {SIZES.map(s => <Pill key={s} active={size === s} onClick={() => setSize(s)}>{s}</Pill>)}
        </ControlRow>
      }
    />
  );
}

export function AvatarSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Avatar</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Shows a user's photo or auto-generated initials when no photo is available. Four sizes for different contexts — from compact table rows to larger profile areas.
        </p>
      </div>
      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
      <SectionBlock title="Props">
        <PropsTable source={avatarTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
