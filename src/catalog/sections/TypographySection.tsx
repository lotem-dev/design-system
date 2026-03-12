import { PageWrapper } from "../ui/PageWrapper";
import { Text } from "../../../components/typography/Text";
import { typographyScale } from "../../../components/typography/scale";
import { typographyRoleTokens, type TypographyRole } from "../../../components/typography/roles";
import { CodeBlock } from "../ui/CodeBlock";
import { TokenTable } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";

const SCALE_VALUES: Record<string, { fontSize: string; lineHeight: string }> = {
  headline: { fontSize: "30px", lineHeight: "36px" },
  title:    { fontSize: "26px", lineHeight: "32px" },
  medium:   { fontSize: "18px", lineHeight: "25px" },
  body:     { fontSize: "14px", lineHeight: "22px" },
  label:    { fontSize: "12px", lineHeight: "16px" },
  xs:       { fontSize: "10px", lineHeight: "14px" },
};

// Maps scale name to the CSS token suffix used in globals.css
const SCALE_TO_TOKEN: Record<string, string> = {
  headline: "2xl",
  title:    "xl",
  medium:   "lg",
  body:     "base",
  label:    "sm",
  xs:       "xs",
};

const ROLE_DETAILS: Record<TypographyRole, { tag: string; usage: string }> = {
  "page-title":       { tag: "<h1>",   usage: "Top-level page heading" },
  "badge-small":      { tag: "<span>", usage: "Text inside small badges" },
  "headline-regular": { tag: "<h1>",   usage: "Large section headers, hero text" },
  "headline-bold":    { tag: "<h1>",   usage: "Large section headers, high emphasis" },
  "title-regular":    { tag: "<h2>",   usage: "Panel or card titles" },
  "title-bold":       { tag: "<h2>",   usage: "Panel or card titles, high emphasis" },
  "medium-regular":   { tag: "<p>",    usage: "Sub-headings, prominent body copy" },
  "medium-bold":      { tag: "<p>",    usage: "Sub-headings with strong emphasis" },
  "body-regular":     { tag: "<p>",    usage: "Default paragraph text" },
  "body-bold":        { tag: "<p>",    usage: "Emphasized paragraph text" },
  "label-regular":    { tag: "<span>", usage: "Form labels, table headers, captions" },
  "label-bold":       { tag: "<span>", usage: "Form labels with strong emphasis" },
  "label-caps":       { tag: "<span>", usage: "Category labels, ALL CAPS section titles" },
  "xs-regular":       { tag: "<span>", usage: "Metadata, timestamps, helper text" },
  "xs-bold":          { tag: "<span>", usage: "Metadata with emphasis, small counts" },
};

export function TypographySection() {
  return (
    <PageWrapper>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Foundation</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Typography</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Two layers: the <strong>scale</strong> defines raw sizes (headline, body, label…).
          <strong> Roles</strong> give text semantic meaning and lock in the scale, weight, and HTML tag.
          Always use <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>{"<Text role=\"...\">"}  </code> — never apply font styles manually.
        </p>
      </div>

      {/* Type scale */}
      <SectionBlock title="Type Scale">
        <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#71717A" }}>
          These are the raw sizes. Don't use them directly in UI — use a Role instead.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {(Object.keys(typographyScale) as Array<keyof typeof typographyScale>).map((scale) => {
            const vals = SCALE_VALUES[scale];
            return (
              <div key={scale} style={{ display: "flex", alignItems: "baseline", gap: "24px", padding: "16px 0", borderBottom: "1px solid #F4F4F5" }}>
                <div style={{ width: "80px", flexShrink: 0 }}>
                  <code style={{ fontSize: "11px", color: "#71717A", fontFamily: "monospace" }}>{scale}</code>
                </div>
                <span style={{ ...typographyScale[scale], fontWeight: 400, color: "var(--text-primary)", flex: 1 }}>
                  The quick brown fox
                </span>
                <div style={{ flexShrink: 0, textAlign: "right" }}>
                  <span style={{ fontSize: "11px", color: "#A1A1AA", fontFamily: "monospace" }}>{vals.fontSize} / {vals.lineHeight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </SectionBlock>

      {/* Roles */}
      <SectionBlock title="Typography Roles">
        <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#71717A" }}>
          Each role locks in a scale + weight + HTML tag. Changing a role here updates every place it's used.
        </p>
        {(Object.keys(typographyRoleTokens) as TypographyRole[]).map((role) => {
          const details = ROLE_DETAILS[role];
          const tokens  = typographyRoleTokens[role];
          const suffix  = SCALE_TO_TOKEN[tokens.scale] ?? tokens.scale;
          return (
            <div key={role} style={{ marginBottom: "32px", padding: "24px", backgroundColor: "#FFFFFF", border: "1px solid #E4E4E7", borderRadius: "8px" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "16px" }}>
                <code style={{ fontSize: "13px", color: "#18181B", fontFamily: "monospace", fontWeight: 600 }}>{role}</code>
                <span style={{ fontSize: "11px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>{details.usage}</span>
              </div>
              <div style={{ padding: "16px", backgroundColor: "#FAFAFA", borderRadius: "6px", marginBottom: "16px" }}>
                <Text role={role}>The quick brown fox</Text>
              </div>
              <TokenTable rows={[
                { property: "font-size",   token: `--font-size-${suffix}`,   value: SCALE_VALUES[tokens.scale].fontSize,   note: `scale: ${tokens.scale}` },
                { property: "line-height", token: `--line-height-${suffix}`,  value: SCALE_VALUES[tokens.scale].lineHeight },
                { property: "font-weight", token: tokens.caps ? "--font-weight-bold" : (String(tokens.weight).includes("bold") ? "--font-weight-bold" : "--font-weight-regular"), value: tokens.caps ? "700" : (String(tokens.weight).includes("bold") ? "700" : "400") },
                { property: "html-tag",    token: "—",                         value: details.tag, note: "locked by role" },
                ...(tokens.caps ? [{ property: "text-transform", token: "--letter-spacing-caps", value: "uppercase / 0.04em", note: "caps role" }] : []),
              ]} />
              <div style={{ marginTop: "16px" }}>
                <CodeBlock code={`<Text role="${role}">Your text here</Text>`} />
              </div>
            </div>
          );
        })}
      </SectionBlock>

      {/* Font tokens */}
      <SectionBlock title="Font Tokens">
        <TokenTable rows={[
          { property: "font-family",          token: "--font-family-default",    value: '"Open Sans", ui-sans-serif, system-ui' },
          { property: "font-weight regular",  token: "--font-weight-regular",    value: "400" },
          { property: "font-weight bold",     token: "--font-weight-bold",       value: "700" },
          { property: "letter-spacing",       token: "--letter-spacing-default", value: "0" },
          { property: "letter-spacing caps",  token: "--letter-spacing-caps",    value: "0.04em" },
        ]} />
      </SectionBlock>
    </PageWrapper>
  );
}
