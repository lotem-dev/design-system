import { useState } from "react";

export type SourceFile = { filename: string; code: string };

/**
 * The right-side panel in split-page layout.
 * Few files (≤5): tab bar across the top — familiar for component pages.
 * Many files (>5): VS Code-style file list on the left, code on the right — works for icon sets.
 */
export function SourcePanel({ files }: { files: SourceFile[] }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const file = files[active];

  function handleCopy() {
    navigator.clipboard.writeText(file.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (files.length > 5) {
    return <FileListLayout files={files} active={active} setActive={setActive} copied={copied} onCopy={handleCopy} />;
  }

  return <TabLayout files={files} active={active} setActive={setActive} copied={copied} onCopy={handleCopy} />;
}

// ─── Tab layout (≤5 files) ──────────────────────────────────────────────────

type LayoutProps = {
  files: SourceFile[];
  active: number;
  setActive: (i: number) => void;
  copied: boolean;
  onCopy: () => void;
};

function TabLayout({ files, active, setActive, copied, onCopy }: LayoutProps) {
  const file = files[active];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#111111" }}>
      <div style={{ display: "flex", alignItems: "stretch", justifyContent: "space-between", borderBottom: "1px solid #27272A", flexShrink: 0 }}>
        <div style={{ display: "flex" }}>
          {files.map((f, i) => (
            <button
              key={f.filename}
              onClick={() => setActive(i)}
              style={{
                padding: "10px 16px",
                background: "transparent",
                border: "none",
                borderBottom: i === active ? "2px solid #5E32FF" : "2px solid transparent",
                color: i === active ? "#E4E4E7" : "#52525B",
                fontSize: "12px",
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
                transition: "color 0.15s",
              }}
            >
              {f.filename}
            </button>
          ))}
        </div>
        <CopyButton copied={copied} onCopy={onCopy} />
      </div>
      <CodeArea code={file.code} />
    </div>
  );
}

// ─── File list layout (>5 files) ────────────────────────────────────────────

function FileListLayout({ files, active, setActive, copied, onCopy }: LayoutProps) {
  const file = files[active];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#111111" }}>

      {/* Top bar: active filename + copy */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #27272A", flexShrink: 0, padding: "0 0 0 0" }}>
        <span style={{ padding: "10px 16px", color: "#A1A1AA", fontSize: "12px", fontFamily: "'JetBrains Mono', 'Fira Code', monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {file.filename}
        </span>
        <CopyButton copied={copied} onCopy={onCopy} />
      </div>

      {/* Body: file list + code side by side */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* File list */}
        <div style={{ width: "180px", flexShrink: 0, borderRight: "1px solid #27272A", overflowY: "auto" }}>
          {files.map((f, i) => (
            <button
              key={f.filename}
              onClick={() => setActive(i)}
              style={{
                display: "block",
                width: "100%",
                padding: "7px 12px",
                background: i === active ? "#1C1C1C" : "transparent",
                border: "none",
                borderLeft: i === active ? "2px solid #5E32FF" : "2px solid transparent",
                color: i === active ? "#E4E4E7" : "#52525B",
                fontSize: "11px",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                transition: "color 0.1s, background 0.1s",
              }}
            >
              {f.filename}
            </button>
          ))}
        </div>

        {/* Code */}
        <div style={{ flex: 1, overflow: "auto" }}>
          <pre style={{
            margin: 0,
            padding: "24px",
            backgroundColor: "#111111",
            color: "#E4E4E7",
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
            fontSize: "12px",
            lineHeight: "1.7",
            whiteSpace: "pre",
          }}>
            <code>{file.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

// ─── Shared subcomponents ────────────────────────────────────────────────────

function CopyButton({ copied, onCopy }: { copied: boolean; onCopy: () => void }) {
  return (
    <button
      onClick={onCopy}
      style={{
        padding: "8px 16px",
        background: "transparent",
        border: "none",
        borderLeft: "1px solid #27272A",
        color: copied ? "#22C55E" : "#52525B",
        fontSize: "11px",
        cursor: "pointer",
        fontFamily: "'Open Sans', system-ui, sans-serif",
        transition: "color 0.15s",
        flexShrink: 0,
      }}
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

function CodeArea({ code }: { code: string }) {
  return (
    <div style={{ flex: 1, overflow: "auto" }}>
      <pre style={{
        margin: 0,
        padding: "24px",
        backgroundColor: "#111111",
        color: "#E4E4E7",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        fontSize: "12px",
        lineHeight: "1.7",
        whiteSpace: "pre",
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
