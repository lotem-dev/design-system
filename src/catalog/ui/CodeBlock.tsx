import { useState } from "react";

type CodeBlockProps = {
  code: string;
};

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden" }}>
      <pre
        style={{
          margin: 0,
          padding: "16px",
          backgroundColor: "#18181B",
          color: "#E4E4E7",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
          fontSize: "13px",
          lineHeight: "1.6",
          overflowX: "auto",
          whiteSpace: "pre",
        }}
      >
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "4px 10px",
          backgroundColor: copied ? "#22C55E" : "#3F3F46",
          color: "#FAFAFA",
          border: "none",
          borderRadius: "4px",
          fontSize: "11px",
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "background-color 0.15s",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
