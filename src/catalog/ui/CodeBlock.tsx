import { useState } from "react";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("css", css);

type CodeBlockProps = {
  code: string;
  language?: "typescript" | "css";
};

export function CodeBlock({ code, language = "typescript" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const highlighted = hljs.highlight(code, { language }).value;

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
          backgroundColor: "#FFFFFF",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
          fontSize: "13px",
          lineHeight: "1.6",
          overflowX: "auto",
          whiteSpace: "pre",
        }}
      >
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
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
