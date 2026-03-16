import { useState } from "react";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("css", css);

function highlight(code: string, filename: string): string {
  const lang = filename.endsWith(".css") ? "css" : "typescript";
  return hljs.highlight(code, { language: lang }).value;
}

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
    <div style={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#FFFFFF" }}>
      <div style={{ display: "flex", alignItems: "stretch", justifyContent: "space-between", borderBottom: "1px solid #E4E4E7", flexShrink: 0 }}>
        <div style={{ display: "flex" }}>
          {files.map((f, i) => (
            <button
              key={f.filename}
              onClick={() => setActive(i)}
              style={{
                padding: "10px 16px",
                background: "transparent",
                border: "none",
                borderBottom: i === active ? "2px solid #18181B" : "2px solid transparent",
                color: i === active ? "#18181B" : "#A1A1AA",
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
      <CodeArea code={file.code} filename={file.filename} />
    </div>
  );
}

// ─── File list layout (>5 files) ────────────────────────────────────────────

function FileListLayout({ files, active, setActive, copied, onCopy }: LayoutProps) {
  const file = files[active];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#FFFFFF" }}>

      {/* Top bar: active filename + copy */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #E4E4E7", flexShrink: 0 }}>
        <span style={{ padding: "10px 16px", color: "#71717A", fontSize: "12px", fontFamily: "'JetBrains Mono', 'Fira Code', monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {file.filename}
        </span>
        <CopyButton copied={copied} onCopy={onCopy} />
      </div>

      {/* Body: file list + code side by side */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* File list */}
        <div style={{ width: "180px", flexShrink: 0, borderRight: "1px solid #E4E4E7", overflowY: "auto", backgroundColor: "#F8F8F8" }}>
          {files.map((f, i) => (
            <button
              key={f.filename}
              onClick={() => setActive(i)}
              style={{
                display: "block",
                width: "100%",
                padding: "7px 12px",
                background: i === active ? "#FFFFFF" : "transparent",
                border: "none",
                borderLeft: i === active ? "2px solid #18181B" : "2px solid transparent",
                color: i === active ? "#18181B" : "#71717A",
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
            backgroundColor: "#FFFFFF",
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
            fontSize: "12px",
            lineHeight: "1.7",
            whiteSpace: "pre",
          }}>
            <code dangerouslySetInnerHTML={{ __html: highlight(file.code, file.filename) }} />
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
        borderLeft: "1px solid #E4E4E7",
        color: copied ? "#16A34A" : "#A1A1AA",
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

function CodeArea({ code, filename }: { code: string; filename: string }) {
  return (
    <div style={{ flex: 1, overflow: "auto" }}>
      <pre style={{
        margin: 0,
        padding: "24px",
        backgroundColor: "#FFFFFF",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        fontSize: "12px",
        lineHeight: "1.7",
        whiteSpace: "pre",
      }}>
        <code dangerouslySetInnerHTML={{ __html: highlight(code, filename) }} />
      </pre>
    </div>
  );
}
