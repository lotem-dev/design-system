import { SplitPage } from "../ui/SplitPage";
import { TokenTable } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";
import typographyCss from "../../../styles/tokens/typography.css?raw";

const sources = [{ filename: "typography.css", code: typographyCss }];

const SUBTITLE: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  color: "#A1A1AA",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  fontFamily: "'Open Sans', system-ui, sans-serif",
  margin: "0 0 6px",
};

export function TypographySection() {
  return (
    <SplitPage files={sources} alwaysOpen>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Typography</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Two layers - the same pattern as colors.css. <strong>Primitive tokens</strong> define the raw scale
          (<code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>--font-size-sm</code>).{" "}
          <strong>Semantic role tokens</strong> point to primitives and carry intent
          (<code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>--font-label-size</code>).{" "}
          CSS modules reference the semantic layer - never primitives directly.
        </p>
      </div>

      {/* Layer 1 — same order as the CSS file */}

      <SectionBlock title="Font Family">
        <TokenTable hideProperty rows={[
          { property: "font-family", token: "--font-sans", value: '"Open Sans", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' },
        ]} />
      </SectionBlock>

      <SectionBlock title="Font Weights">
        <TokenTable hideProperty rows={[
          { property: "font-weight", token: "--font-weight-regular",  value: "400" },
          { property: "font-weight", token: "--font-weight-semibold", value: "600" },
          { property: "font-weight", token: "--font-weight-bold",     value: "700" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Font Sizes">
        <TokenTable hideProperty rows={[
          { property: "font-size", token: "--font-size-2xl",  value: "1.875rem" },
          { property: "font-size", token: "--font-size-xl",   value: "1.625rem" },
          { property: "font-size", token: "--font-size-lg",   value: "1.125rem" },
          { property: "font-size", token: "--font-size-base", value: "0.875rem" },
          { property: "font-size", token: "--font-size-sm",   value: "0.75rem"  },
          { property: "font-size", token: "--font-size-xs",   value: "0.625rem" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Line Heights">
        <TokenTable hideProperty rows={[
          { property: "line-height", token: "--line-height-2xl",  value: "2.25rem",   note: "36px" },
          { property: "line-height", token: "--line-height-xl",   value: "2rem",      note: "32px" },
          { property: "line-height", token: "--line-height-lg",   value: "1.5625rem", note: "25px" },
          { property: "line-height", token: "--line-height-base", value: "1.375rem",  note: "22px" },
          { property: "line-height", token: "--line-height-sm",   value: "1rem",      note: "16px" },
          { property: "line-height", token: "--line-height-xs",   value: "0.875rem",  note: "14px" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Letter Spacing">
        <TokenTable hideProperty rows={[
          { property: "letter-spacing", token: "--letter-spacing-default", value: "0",      note: "Default for all text" },
          { property: "letter-spacing", token: "--letter-spacing-caps",    value: "0.04em", note: "Uppercase labels and tags" },
        ]} />
      </SectionBlock>

      {/* Layer 2 — split by property type */}

      <SectionBlock title="Semantic Role Tokens">
        <p style={SUBTITLE}>Font size</p>
        <TokenTable hideProperty rows={[
          { property: "font-size", token: "--font-headline-size", value: "var(--font-size-2xl)"  },
          { property: "font-size", token: "--font-title-size",    value: "var(--font-size-xl)"   },
          { property: "font-size", token: "--font-medium-size",   value: "var(--font-size-lg)"   },
          { property: "font-size", token: "--font-body-size",     value: "var(--font-size-base)" },
          { property: "font-size", token: "--font-label-size",    value: "var(--font-size-sm)"   },
          { property: "font-size", token: "--font-xs-size",       value: "var(--font-size-xs)"   },
        ]} />
        <p style={{ ...SUBTITLE, marginTop: "20px" }}>Line height</p>
        <TokenTable hideProperty rows={[
          { property: "line-height", token: "--font-headline-line-height", value: "var(--line-height-2xl)"  },
          { property: "line-height", token: "--font-title-line-height",    value: "var(--line-height-xl)"   },
          { property: "line-height", token: "--font-medium-line-height",   value: "var(--line-height-lg)"   },
          { property: "line-height", token: "--font-body-line-height",     value: "var(--line-height-base)" },
          { property: "line-height", token: "--font-label-line-height",    value: "var(--line-height-sm)"   },
          { property: "line-height", token: "--font-xs-line-height",       value: "var(--line-height-xs)"   },
        ]} />
      </SectionBlock>

      {/* Global application */}

      <SectionBlock title="Global Application">
        <p style={{ fontSize: "14px", color: "#52525B", lineHeight: "1.6", marginBottom: "16px" }}>
          These rules are applied directly in typography.css - not as tokens, but as global defaults on base elements.
        </p>
        <TokenTable rows={[
          { property: "font-family",     token: "html, body",                      value: "var(--font-sans)"              },
          { property: "letter-spacing",  token: "html, body",                      value: "var(--letter-spacing-default)" },
          { property: "color",           token: "html, body",                      value: "var(--text-primary)"           },
          { property: "color",           token: "a",                               value: "var(--text-brand)"             },
          { property: "text-decoration", token: "a[data-underline-hover] :hover",  value: "underline"                     },
          { property: "outline",         token: "a:focus-visible",                 value: "2px solid currentColor"        },
          { property: "outline-offset",  token: "a:focus-visible",                 value: "2px"                           },
        ]} />
      </SectionBlock>

    </SplitPage>
  );
}
