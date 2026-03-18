import { Text, type TypographyRole } from "../../../components/foundation/Text";
import { PropsTable } from "../ui/PropsTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";

import textTsx       from "../../../components/foundation/Text.tsx?raw";
import textModuleCss from "../../../components/foundation/Text.module.css?raw";

const sources = [
  { filename: "Text.tsx",        code: textTsx       },
  { filename: "Text.module.css", code: textModuleCss },
];

const ROLES: { role: TypographyRole; tag: string }[] = [
  { role: "headline-regular", tag: "h1"   },
  { role: "headline-bold",    tag: "h1"   },
  { role: "title-regular",    tag: "h2"   },
  { role: "title-bold",       tag: "h2"   },
  { role: "medium-regular",   tag: "p"    },
  { role: "medium-bold",      tag: "p"    },
  { role: "body-regular",     tag: "p"    },
  { role: "body-bold",        tag: "p"    },
  { role: "label-regular",    tag: "span" },
  { role: "label-bold",       tag: "span" },
  { role: "label-caps",       tag: "span" },
  { role: "xs-regular",       tag: "span" },
  { role: "xs-bold",          tag: "span" },
];

export function TextSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Text</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Renders any text using a named role. Each role locks in font-size, line-height, font-weight, and the correct HTML tag via{" "}
          <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>Text.module.css</code>.{" "}
          Never apply font styles manually - always use{" "}
          <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>{"<Text role=\"...\">"}</code>.
        </p>
      </div>

      <SectionBlock title="Roles">
        <div>
          {ROLES.map(({ role, tag }) => (
            <div
              key={role}
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "24px",
                padding: "12px 0",
                borderBottom: "1px solid #F4F4F5",
              }}
            >
              <Text role={role}>The quick brown fox</Text>
              <div style={{ display: "flex", gap: "16px", flexShrink: 0, alignItems: "center" }}>
                <code style={{ fontSize: "11px", color: "#18181B", fontFamily: "monospace", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px", whiteSpace: "nowrap" }}>
                  {role}
                </code>
                <code style={{ fontSize: "11px", color: "#A1A1AA", fontFamily: "monospace", whiteSpace: "nowrap" }}>
                  &lt;{tag}&gt;
                </code>
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title="Props">
        <PropsTable source={textTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
