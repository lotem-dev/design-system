import { SplitPage } from "../ui/SplitPage";
import { Text, type TypographyRole } from "../../../components/foundation/Text";
import { CodeBlock } from "../ui/CodeBlock";
import { TokenTable } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";

import typographyCss    from "../../../styles/tokens/typography.css?raw";
import textModuleCss   from "../../../components/foundation/Text.module.css?raw";
import textTsx         from "../../../components/foundation/Text.tsx?raw";

const sources = [
  { filename: "typography.css",  code: typographyCss },
  { filename: "Text.module.css", code: textModuleCss },
  { filename: "Text.tsx",        code: textTsx },
];

// ─── Scale display data ──────────────────────────────────────────────────────
// Used in the "Type Scale" section — shows raw sizes for reference.
const SCALE: { name: string; sizeToken: string; px: string; lineHeight: string }[] = [
  { name: "headline", sizeToken: "--font-headline-size", px: "30px", lineHeight: "36px" },
  { name: "title",    sizeToken: "--font-title-size",    px: "26px", lineHeight: "32px" },
  { name: "medium",   sizeToken: "--font-medium-size",   px: "18px", lineHeight: "25px" },
  { name: "body",     sizeToken: "--font-body-size",     px: "14px", lineHeight: "22px" },
  { name: "label",    sizeToken: "--font-label-size",    px: "12px", lineHeight: "16px" },
  { name: "xs",       sizeToken: "--font-xs-size",       px: "10px", lineHeight: "14px" },
];

// ─── Role display data ───────────────────────────────────────────────────────
// All 13 roles. Each entry has everything the catalog card needs to display.
const ROLES: {
  role: TypographyRole;
  tag: string;
  usage: string;
  sizeToken: string;
  lineHeightToken: string;
  px: string;
  lineHeight: string;
  weight: string;
  weightToken: string;
  caps?: true;
}[] = [
  // Headline
  { role: "headline-regular", tag: "<h1>",   usage: "Large section headers, hero text",           sizeToken: "--font-headline-size", lineHeightToken: "--font-headline-line-height", px: "30px", lineHeight: "36px", weight: "400", weightToken: "--font-weight-regular" },
  { role: "headline-bold",    tag: "<h1>",   usage: "Large section headers, high emphasis",        sizeToken: "--font-headline-size", lineHeightToken: "--font-headline-line-height", px: "30px", lineHeight: "36px", weight: "700", weightToken: "--font-weight-bold" },
  // Title
  { role: "title-regular",    tag: "<h2>",   usage: "Panel or card titles",                        sizeToken: "--font-title-size",    lineHeightToken: "--font-title-line-height",    px: "26px", lineHeight: "32px", weight: "400", weightToken: "--font-weight-regular" },
  { role: "title-bold",       tag: "<h2>",   usage: "Panel or card titles, high emphasis",         sizeToken: "--font-title-size",    lineHeightToken: "--font-title-line-height",    px: "26px", lineHeight: "32px", weight: "700", weightToken: "--font-weight-bold" },
  // Medium
  { role: "medium-regular",   tag: "<p>",    usage: "Sub-headings, prominent body copy",           sizeToken: "--font-medium-size",   lineHeightToken: "--font-medium-line-height",   px: "18px", lineHeight: "25px", weight: "400", weightToken: "--font-weight-regular" },
  { role: "medium-bold",      tag: "<p>",    usage: "Sub-headings with strong emphasis",           sizeToken: "--font-medium-size",   lineHeightToken: "--font-medium-line-height",   px: "18px", lineHeight: "25px", weight: "700", weightToken: "--font-weight-bold" },
  // Body
  { role: "body-regular",     tag: "<p>",    usage: "Default paragraph text",                      sizeToken: "--font-body-size",     lineHeightToken: "--font-body-line-height",     px: "14px", lineHeight: "22px", weight: "400", weightToken: "--font-weight-regular" },
  { role: "body-bold",        tag: "<p>",    usage: "Emphasized paragraph text",                   sizeToken: "--font-body-size",     lineHeightToken: "--font-body-line-height",     px: "14px", lineHeight: "22px", weight: "700", weightToken: "--font-weight-bold" },
  // Label
  { role: "label-regular",    tag: "<span>", usage: "Form labels, table headers, captions",        sizeToken: "--font-label-size",    lineHeightToken: "--font-label-line-height",    px: "12px", lineHeight: "16px", weight: "400", weightToken: "--font-weight-regular" },
  { role: "label-bold",       tag: "<span>", usage: "Form labels with strong emphasis",            sizeToken: "--font-label-size",    lineHeightToken: "--font-label-line-height",    px: "12px", lineHeight: "16px", weight: "700", weightToken: "--font-weight-bold" },
  { role: "label-caps",       tag: "<span>", usage: "Category labels, ALL CAPS section titles",    sizeToken: "--font-label-size",    lineHeightToken: "--font-label-line-height",    px: "12px", lineHeight: "16px", weight: "700", weightToken: "--font-weight-bold", caps: true },
  // XS
  { role: "xs-regular",       tag: "<span>", usage: "Metadata, timestamps, helper text",           sizeToken: "--font-xs-size",       lineHeightToken: "--font-xs-line-height",       px: "10px", lineHeight: "14px", weight: "400", weightToken: "--font-weight-regular" },
  { role: "xs-bold",          tag: "<span>", usage: "Metadata with emphasis, small counts",        sizeToken: "--font-xs-size",       lineHeightToken: "--font-xs-line-height",       px: "10px", lineHeight: "14px", weight: "700", weightToken: "--font-weight-bold" },
];

export function TypographySection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Typography</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Two layers — the same pattern as Colors. <strong>Primitive tokens</strong> define the raw scale (<code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>--font-size-sm</code>).{" "}
          <strong>Semantic role tokens</strong> point to primitives and carry meaning (<code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>--font-label-size</code>).{" "}
          <strong>Roles</strong> in <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>Text.module.css</code> bundle size + weight + line-height into one named class.{" "}
          Always use <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>{"<Text role=\"...\"/>"}</code> — never apply font styles manually.
        </p>
      </div>

      {/* Type scale */}
      <SectionBlock title="Type Scale">
        <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#71717A" }}>
          The six raw sizes. Components reference these via semantic role tokens — never directly.
        </p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {SCALE.map(({ name, sizeToken, px, lineHeight }) => (
            <div key={name} style={{ display: "flex", alignItems: "baseline", gap: "24px", padding: "16px 0", borderBottom: "1px solid #F4F4F5" }}>
              <code style={{ width: "80px", flexShrink: 0, fontSize: "11px", color: "#71717A", fontFamily: "monospace" }}>{name}</code>
              <span style={{
                fontSize: `${px}`,
                lineHeight: lineHeight,
                fontWeight: 400,
                fontFamily: "var(--font-family-default)",
                color: "var(--text-primary)",
                flex: 1,
              }}>
                The quick brown fox
              </span>
              <div style={{ flexShrink: 0, textAlign: "right" }}>
                <code style={{ fontSize: "11px", color: "#A1A1AA", fontFamily: "monospace" }}>{sizeToken}</code>
                <span style={{ fontSize: "11px", color: "#D4D4D8", margin: "0 4px" }}>·</span>
                <span style={{ fontSize: "11px", color: "#A1A1AA", fontFamily: "monospace" }}>{px} / {lineHeight}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* Roles */}
      <SectionBlock title="Typography Roles">
        <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#71717A" }}>
          Each role bundles size + weight + line-height into one named class, plus the correct HTML tag.
          Changing a role here updates every place it's used.
        </p>
        {ROLES.map((r) => (
          <div key={r.role} style={{ marginBottom: "16px", padding: "24px", backgroundColor: "#FFFFFF", border: "1px solid #E4E4E7", borderRadius: "8px" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "16px" }}>
              <code style={{ fontSize: "13px", color: "#18181B", fontFamily: "monospace", fontWeight: 600 }}>{r.role}</code>
              <span style={{ fontSize: "11px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>{r.usage}</span>
            </div>
            <div style={{ padding: "16px", backgroundColor: "#FAFAFA", borderRadius: "6px", marginBottom: "16px" }}>
              <Text role={r.role}>The quick brown fox</Text>
            </div>
            <TokenTable rows={[
              { property: "font-size",      token: r.sizeToken,        value: r.px,         note: `→ --font-size-${r.sizeToken.replace("--font-", "").replace("-size", "")}` },
              { property: "line-height",    token: r.lineHeightToken,  value: r.lineHeight },
              { property: "font-weight",    token: r.weightToken,      value: r.weight },
              { property: "html-tag",       token: "—",                value: r.tag,         note: "locked by role" },
              ...(r.caps ? [{ property: "text-transform", token: "--letter-spacing-caps", value: "uppercase / 0.04em", note: "caps role" }] : []),
            ]} />
            <div style={{ marginTop: "16px" }}>
              <CodeBlock code={`<Text role="${r.role}">Your text here</Text>`} />
            </div>
          </div>
        ))}
      </SectionBlock>

      {/* Font tokens */}
      <SectionBlock title="Font Tokens">
        <TokenTable rows={[
          { property: "font-family",          token: "--font-family-default",    value: '"Open Sans", ui-sans-serif, system-ui' },
          { property: "font-weight regular",  token: "--font-weight-regular",    value: "400" },
          { property: "font-weight semibold", token: "--font-weight-semibold",   value: "600" },
          { property: "font-weight bold",     token: "--font-weight-bold",       value: "700" },
          { property: "letter-spacing",       token: "--letter-spacing-default", value: "0" },
          { property: "letter-spacing caps",  token: "--letter-spacing-caps",    value: "0.04em" },
        ]} />
      </SectionBlock>
    </SplitPage>
  );
}
