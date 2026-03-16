import { SplitPage } from "../ui/SplitPage";
import { TokenTable } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";
import typographyCss from "../../../styles/tokens/typography.css?raw";

const sources = [{ filename: "typography.css", code: typographyCss }];

export function TypographySection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Typography</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Two layers — the same pattern as colors.css. <strong>Primitive tokens</strong> define the raw size scale
          (<code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>--font-size-sm</code>).{" "}
          <strong>Semantic role tokens</strong> point to primitives and carry intent
          (<code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>--font-label-size</code>).{" "}
          CSS modules reference the semantic layer — never primitives directly.
        </p>
      </div>

      {/* Visual scale */}
      <SectionBlock title="Type Scale">
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            { label: "headline", token: "--font-headline-size", px: "30px", lh: "36px" },
            { label: "title",    token: "--font-title-size",    px: "26px", lh: "32px" },
            { label: "medium",   token: "--font-medium-size",   px: "18px", lh: "25px" },
            { label: "body",     token: "--font-body-size",     px: "14px", lh: "22px" },
            { label: "label",    token: "--font-label-size",    px: "12px", lh: "16px" },
            { label: "xs",       token: "--font-xs-size",       px: "10px", lh: "14px" },
          ].map(({ label, token, px, lh }) => (
            <div key={label} style={{ display: "flex", alignItems: "baseline", gap: "24px", padding: "14px 0", borderBottom: "1px solid #F4F4F5" }}>
              <code style={{ width: "72px", flexShrink: 0, fontSize: "11px", color: "#A1A1AA", fontFamily: "monospace" }}>{label}</code>
              <span style={{ fontSize: px, lineHeight: lh, fontFamily: "var(--font-family-default)", color: "#18181B", flex: 1 }}>
                The quick brown fox
              </span>
              <div style={{ flexShrink: 0, textAlign: "right" }}>
                <code style={{ fontSize: "11px", color: "#A1A1AA", fontFamily: "monospace" }}>{token}</code>
                <span style={{ fontSize: "11px", color: "#D4D4D8", margin: "0 6px" }}>·</span>
                <code style={{ fontSize: "11px", color: "#A1A1AA", fontFamily: "monospace" }}>{px} / {lh}</code>
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* Primitive tokens */}
      <SectionBlock title="Primitive Sizes">
        <TokenTable rows={[
          { property: "font-size", token: "--font-size-2xl",  value: "1.875rem" },
          { property: "font-size", token: "--font-size-xl",   value: "1.625rem" },
          { property: "font-size", token: "--font-size-lg",   value: "1.125rem" },
          { property: "font-size", token: "--font-size-base", value: "0.875rem" },
          { property: "font-size", token: "--font-size-sm",   value: "0.75rem"  },
          { property: "font-size", token: "--font-size-xs",   value: "0.625rem" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Primitive Line Heights">
        <TokenTable rows={[
          { property: "line-height", token: "--line-height-2xl",  value: "2.25rem"   },
          { property: "line-height", token: "--line-height-xl",   value: "2rem"      },
          { property: "line-height", token: "--line-height-lg",   value: "1.5625rem" },
          { property: "line-height", token: "--line-height-base", value: "1.375rem"  },
          { property: "line-height", token: "--line-height-sm",   value: "1rem"      },
          { property: "line-height", token: "--line-height-xs",   value: "0.875rem"  },
        ]} />
      </SectionBlock>

      {/* Semantic role tokens */}
      <SectionBlock title="Semantic Role Tokens">
        <TokenTable rows={[
          { property: "font-size",   token: "--font-headline-size",        value: "var(--font-size-2xl)"  },
          { property: "line-height", token: "--font-headline-line-height",  value: "var(--line-height-2xl)" },
          { property: "font-size",   token: "--font-title-size",           value: "var(--font-size-xl)"   },
          { property: "line-height", token: "--font-title-line-height",    value: "var(--line-height-xl)"  },
          { property: "font-size",   token: "--font-medium-size",          value: "var(--font-size-lg)"   },
          { property: "line-height", token: "--font-medium-line-height",   value: "var(--line-height-lg)"  },
          { property: "font-size",   token: "--font-body-size",            value: "var(--font-size-base)" },
          { property: "line-height", token: "--font-body-line-height",     value: "var(--line-height-base)" },
          { property: "font-size",   token: "--font-label-size",           value: "var(--font-size-sm)"   },
          { property: "line-height", token: "--font-label-line-height",    value: "var(--line-height-sm)"  },
          { property: "font-size",   token: "--font-xs-size",              value: "var(--font-size-xs)"   },
          { property: "line-height", token: "--font-xs-line-height",       value: "var(--line-height-xs)"  },
        ]} />
      </SectionBlock>

      {/* Font family, weights, letter spacing */}
      <SectionBlock title="Font Family & Weights">
        <TokenTable rows={[
          { property: "font-family",    token: "--font-family-default",    value: '"Open Sans", ui-sans-serif, system-ui' },
          { property: "font-weight",    token: "--font-weight-regular",    value: "400" },
          { property: "font-weight",    token: "--font-weight-semibold",   value: "600" },
          { property: "font-weight",    token: "--font-weight-bold",       value: "700" },
          { property: "letter-spacing", token: "--letter-spacing-default", value: "0"      },
          { property: "letter-spacing", token: "--letter-spacing-caps",    value: "0.04em" },
        ]} />
      </SectionBlock>
    </SplitPage>
  );
}
