import { useState } from "react";
import { Skeleton } from "../../../components/atoms/Skeleton";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import skeletonTsx from "../../../components/atoms/Skeleton.tsx?raw";
import skeletonCss from "../../../components/atoms/Skeleton.module.css?raw";

const sources = [
  { filename: "Skeleton.tsx",        code: skeletonTsx },
  { filename: "Skeleton.module.css", code: skeletonCss },
];

type SkeletonVariant = "text" | "circle" | "rect";
const VARIANTS: SkeletonVariant[] = ["text", "circle", "rect"];

function FakeListItem({ animated }: { animated: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Skeleton variant="circle" width={36} height={36} animated={animated} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
        <Skeleton variant="text" width="60%" height={12} animated={animated} />
        <Skeleton variant="text" width="90%" height={12} animated={animated} />
      </div>
    </div>
  );
}

function Playground() {
  const [variant, setVariant]   = useState<SkeletonVariant>("text");
  const [animated, setAnimated] = useState(true);

  return (
    <PlaygroundShell
      preview={
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "280px" }}>
          {/* Single configurable skeleton */}
          <Skeleton
            variant={variant}
            width={variant === "circle" ? 48 : "100%"}
            height={variant === "circle" ? 48 : 20}
            animated={animated}
          />
          {/* Realistic list example */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <FakeListItem animated={animated} />
            <FakeListItem animated={animated} />
            <FakeListItem animated={animated} />
          </div>
        </div>
      }
      controls={
        <>
          <ControlRow label="Variant">
            {VARIANTS.map(v => <Pill key={v} active={variant === v} onClick={() => setVariant(v)}>{v}</Pill>)}
          </ControlRow>
          <ControlRow label="Animated">
            <Pill active={animated}  onClick={() => setAnimated(true)}>yes</Pill>
            <Pill active={!animated} onClick={() => setAnimated(false)}>no</Pill>
          </ControlRow>
        </>
      }
    />
  );
}

export function SkeletonSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Feedback</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Skeleton</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A placeholder that mimics the shape of real content while it's loading. Prevents blank screens and reduces perceived wait time.
        </p>
      </div>
      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
      <SectionBlock title="Props">
        <PropsTable source={skeletonTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
