import { useState } from "react";

export type SourceFile = { filename: string; code: string };

/**
 * The right-side panel in split-page layout.
 * Shows the actual source code of the component — imported with Vite's ?raw loader
 * so it is always the real, up-to-date file content.
 * When multiple files are provided (e.g. Foo.tsx + Foo.module.css), a tab bar appears.
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

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#111111" }}>

      {/* Tab bar */}
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

        {/* Copy button — always top-right, copies the active file */}
        <button
          onClick={handleCopy}
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
      </div>

      {/* Code area — scrolls independently */}
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
  );
}
