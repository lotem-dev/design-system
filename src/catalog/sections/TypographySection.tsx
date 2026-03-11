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

const ROLE_DETAILS: Record<TypographyRole, { scale: string; weight: string; tag: string; usage: string }> = {
  "page-title": { scale: "headline", weight: "700 (bold)", tag: "<h1>", usage: "Top-level page heading" },
  "badge-small": { scale: "label",   weight: "700 (bold)", tag: "<span>", usage: "Text inside small badges" },
};

export function TypographySection() {
  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "system-ui" }}>Foundation</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "system-ui" }}>Typography</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Two layers: the <strong>scale</strong> defines raw sizes (headline, body, label…).
          <strong> Roles</strong> give text semantic meaning (page-title, badge-small…) and lock in
          the scale, weight, and HTML tag. Always use <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>{"<Text role=\"...\">"}  </code> — never apply font styles manually.
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
          Each role locks in a scale + weight + HTML tag. This means changing a role here updates every place it's used across the product.
        </p>
        {(Object.keys(typographyRoleTokens) as TypographyRole[]).map((role) => {
          const details = ROLE_DETAILS[role];
          return (
            <div key={role} style={{ marginBottom: "32px", padding: "24px", backgroundColor: "#FFFFFF", border: "1px solid #E4E4E7", borderRadius: "8px" }}>
              {/* Role name + live preview */}
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "16px" }}>
                <code style={{ fontSize: "13px", color: "#18181B", fontFamily: "monospace", fontWeight: 600 }}>{role}</code>
                <span style={{ fontSize: "11px", color: "#A1A1AA", fontFamily: "system-ui" }}>{details?.usage}</span>
              </div>
              <div style={{ padding: "16px", backgroundColor: "#FAFAFA", borderRadius: "6px", marginBottom: "16px" }}>
                <Text role={role}>The quick brown fox</Text>
              </div>
              <TokenTable rows={[
                { property: "scale",       token: `--font-size-${typographyRoleTokens[role].scale === "headline" ? "2xl" : typographyRoleTokens[role].scale === "title" ? "xl" : typographyRoleTokens[role].scale === "medium" ? "lg" : typographyRoleTokens[role].scale === "body" ? "base" : typographyRoleTokens[role].scale === "label" ? "sm" : "xs"}`, value: SCALE_VALUES[typographyRoleTokens[role].scale].fontSize, note: `scale: ${typographyRoleTokens[role].scale}` },
                { property: "line-height", token: `--line-height-${typographyRoleTokens[role].scale === "headline" ? "2xl" : typographyRoleTokens[role].scale === "title" ? "xl" : typographyRoleTokens[role].scale === "medium" ? "lg" : typographyRoleTokens[role].scale === "body" ? "base" : typographyRoleTokens[role].scale === "label" ? "sm" : "xs"}`, value: SCALE_VALUES[typographyRoleTokens[role].scale].lineHeight },
                { property: "font-weight", token: "--font-weight-bold", value: "700" },
                { property: "html-tag",    token: "—", value: details?.tag ?? "", note: "locked by role" },
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
          { property: "font-family", token: "--font-family-default", value: '"Open Sans", ui-sans-serif, system-ui' },
          { property: "font-weight regular", token: "--font-weight-regular", value: "400" },
          { property: "font-weight bold",    token: "--font-weight-bold",    value: "700" },
          { property: "letter-spacing",      token: "--letter-spacing-default", value: "0" },
          { property: "letter-spacing caps", token: "--letter-spacing-caps",    value: "0.04em" },
        ]} />
      </SectionBlock>
    </div>
  );
}
