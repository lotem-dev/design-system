import { useState } from "react";
import { ResourceItem, type ResourceType } from "../../../components/tables/ResourceItem";
import { SelectInput } from "../../../components/fields/SelectInput";
import { TokenTable } from "../ui/TokenTable";
import { PropsTable } from "../ui/PropsTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import resourceItemTsx from "../../../components/tables/ResourceItem.tsx?raw";
import resourceItemCss from "../../../components/tables/ResourceItem.module.css?raw";

const sources = [
  { filename: "ResourceItem.tsx",        code: resourceItemTsx },
  { filename: "ResourceItem.module.css", code: resourceItemCss },
];

const ALL_TYPES: ResourceType[] = [
  "GitHub Repository", "GitLab Project", "BitBucket Repository", "Azure DevOps Repository",
  "GitHub Organization", "GitLab Group", "BitBucket Workspace", "Azure DevOps Organization",
  "AWS Service", "GCP Service", "Azure Service",
  "AWS Account", "GCP Account", "Azure Account",
  "Web App", "API", "Application",
];

const TYPE_OPTIONS = ALL_TYPES.map(t => ({ label: t, value: t }));

const EXAMPLE_PROPS: Record<ResourceType, object> = {
  "GitHub Repository":         { name: "my-repo",           prefix: "github-org/",       detail: "main" },
  "GitLab Project":            { name: "my-project",        prefix: "gitlab-group/",     detail: "main" },
  "BitBucket Repository":      { name: "my-repo",           prefix: "bitbucket-ws/",     detail: "main" },
  "Azure DevOps Repository":   { name: "my-repo",           prefix: "Azure DevOps Org/", detail: "main" },
  "GitHub Organization":       { name: "GitHub Organization" },
  "GitLab Group":              { name: "GitLab Group" },
  "BitBucket Workspace":       { name: "BitBucket Workspace" },
  "Azure DevOps Organization": { name: "Azure DevOps Organization" },
  "AWS Service":               { name: "openasset_uploads", accountName: "My AWS Account", accountId: "(123456789)", detail: "us-east-1" },
  "GCP Service":               { name: "my-gcp-service",   accountName: "My GCP Project", accountId: "(proj-id)",   detail: "us-central1" },
  "Azure Service":             { name: "my-azure-service", accountName: "My Azure Sub",   accountId: "(sub-id)",    detail: "eastus" },
  "AWS Account":               { accountName: "My AWS Account", accountId: "(123456789)" },
  "GCP Account":               { accountName: "My GCP Project", accountId: "(proj-id)" },
  "Azure Account":             { accountName: "My Azure Sub",   accountId: "(sub-id)" },
  "Web App":                   { name: "web.example.com" },
  "API":                       { name: "api.example.com" },
  "Application":               { name: "My Application" },
};

// ─── Code snippet ─────────────────────────────────────────────────────────────

function generateSnippet(type: ResourceType, isNew: boolean): string {
  const ex = EXAMPLE_PROPS[type] as Record<string, string>;
  const lines = [`type="${type}"`];
  if (isNew) lines.push("isNew");
  for (const [k, v] of Object.entries(ex)) lines.push(`${k}="${v}"`);
  return `<ResourceItem\n  ${lines.join("\n  ")}\n/>`;
}

// ─── Playground ───────────────────────────────────────────────────────────────

type PlaygroundProps = {
  type: ResourceType; onType: (t: ResourceType) => void;
  isNew: boolean;     onNew:  (v: boolean)      => void;
};

function Playground({ type, onType, isNew, onNew }: PlaygroundProps) {
  const [copied, setCopied] = useState(false);
  const snippet = generateSnippet(type, isNew);

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <PlaygroundShell
        preview={<ResourceItem type={type} isNew={isNew} {...EXAMPLE_PROPS[type]} />}
        controls={
          <>
            <ControlRow label="Type">
              <SelectInput
                options={TYPE_OPTIONS}
                value={type}
                onChange={v => onType(v as ResourceType)}
              />
            </ControlRow>
            <ControlRow label="Badge">
              <Pill active={!isNew} onClick={() => onNew(false)}>none</Pill>
              <Pill active={isNew}  onClick={() => onNew(true)}>New!</Pill>
            </ControlRow>
          </>
        }
      />

      {/* Code drawer */}
      <div style={{ marginTop: "12px" }}>
        <div style={{ position: "relative" }}>
          <pre style={{
            margin: 0, padding: "14px 52px 14px 16px",
            backgroundColor: "#18181B", borderRadius: "8px",
            fontSize: "12px", fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            color: "#E4E4E7", lineHeight: "1.7", overflowX: "auto", whiteSpace: "pre",
          }}>
            {snippet}
          </pre>
          <button onClick={copy} style={{
            position: "absolute", top: "10px", right: "10px",
            padding: "3px 10px", fontSize: "11px",
            fontFamily: "'Open Sans', system-ui, sans-serif", fontWeight: 600,
            color: copied ? "#A1A1AA" : "#71717A",
            backgroundColor: "#27272A", border: "1px solid #3F3F46",
            borderRadius: "5px", cursor: "pointer", transition: "color 0.15s",
          }}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Style Reference ──────────────────────────────────────────────────────────

const TH: React.CSSProperties = {
  textAlign: "left", padding: "6px 12px 10px",
  fontSize: "11px", fontWeight: 600, color: "#A1A1AA",
  textTransform: "uppercase", letterSpacing: "0.06em",
  fontFamily: "'Open Sans', system-ui, sans-serif",
  whiteSpace: "nowrap", borderBottom: "2px solid #E4E4E7",
};

const TD: React.CSSProperties = {
  padding: "10px 12px", verticalAlign: "top",
  borderBottom: "1px solid #F4F4F5",
};

type StyleRow = { prop: string; value: string; cssClass: string; properties: string[] };

const STYLE_ROWS: StyleRow[] = [
  { prop: "isNew", value: "true", cssClass: ".newBadge", properties: ["composes: label", "background: var(--brand-tertiary)", "color: var(--brand-secondary)", "border-radius: var(--radius-xs)"] },
];

function StyleReference({ isNew }: { isNew: boolean }) {
  return (
    <div>
      <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
        Base - always applied regardless of props.
      </p>
      <div style={{ overflowX: "auto", marginBottom: "28px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={TH}>Class</th>
              <th style={TH}>Properties</th>
            </tr>
          </thead>
          <tbody>
            {[
              { cls: ".wrapper",     props: ["display: flex", "align-items: center", "gap: var(--space-base)"] },
              { cls: ".icon",        props: ["width: 28px", "height: 28px", "color: var(--text-secondary)"] },
              { cls: ".name",        props: ["composes: body", "color: var(--text-primary)", "text-overflow: ellipsis"] },
              { cls: ".prefix",      props: ["composes: caption-bold", "color: var(--text-secondary)"] },
              { cls: ".detail",      props: ["composes: caption", "color: var(--text-secondary)"] },
              { cls: ".accountName", props: ["composes: caption-bold", "color: var(--text-secondary)"] },
              { cls: ".accountId",   props: ["composes: caption", "color: var(--text-secondary)"] },
            ].map(({ cls, props }) => (
              <tr key={cls}>
                <td style={{ ...TD, whiteSpace: "nowrap" }}>
                  <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>{cls}</code>
                </td>
                <td style={TD}>
                  {props.map(p => (
                    <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: "#52525B", lineHeight: "1.9" }}>{p}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
        Prop-driven - updates as you interact with the playground above.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={TH}>Prop</th>
              <th style={TH}>Value</th>
              <th style={TH}>Class</th>
              <th style={TH}>Properties</th>
            </tr>
          </thead>
          <tbody>
            {STYLE_ROWS.map((row) => {
              const active = row.prop === "isNew" && isNew;
              return (
                <tr key={`${row.prop}-${row.value}`} style={{ backgroundColor: active ? "#F4F4F5" : "transparent" }}>
                  <td style={{ ...TD, borderRight: "1px solid #F4F4F5", verticalAlign: "middle" }}>
                    <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#EBEBEB", padding: "2px 6px", borderRadius: "4px", whiteSpace: "nowrap" }}>{row.prop}</code>
                  </td>
                  <td style={{ ...TD, whiteSpace: "nowrap" }}>
                    <span style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#09090B" : "#71717A", fontWeight: active ? 700 : 400 }}>{row.value}</span>
                  </td>
                  <td style={{ ...TD, whiteSpace: "nowrap" }}>
                    <code style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#18181B" : "#A1A1AA", backgroundColor: active ? "#E4E4E7" : "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>{row.cssClass}</code>
                  </td>
                  <td style={TD}>
                    {row.properties.map(p => (
                      <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#18181B" : "#A1A1AA", lineHeight: "1.9" }}>{p}</div>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ResourceItemSection() {
  const [type, setType] = useState<ResourceType>("GitHub Repository");
  const [isNew, setIsNew] = useState(false);

  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>ResourceItem</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Displays a connected resource with its logo and metadata. Layout adapts to the resource type - git repos show a prefix and branch, cloud services show an account and region, web and app types show just a name.
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ flex: "0 0 52%", minWidth: 0, position: "sticky", top: "24px", alignSelf: "flex-start" }}>
          <SectionBlock title="Playground">
            <Playground type={type} onType={setType} isNew={isNew} onNew={setIsNew} />
          </SectionBlock>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionBlock title="Style Reference">
            <StyleReference isNew={isNew} />
          </SectionBlock>
        </div>
      </div>

      <SectionBlock title="Props">
        <PropsTable source={resourceItemTsx} />
      </SectionBlock>

      <SectionBlock title="Resource Types">
        <TokenTable rows={[
          { property: "Git Repos",       token: "GitHub Repository, GitLab Project, BitBucket Repository, Azure DevOps Repository",       value: "prefix + name + branch" },
          { property: "Git Orgs",        token: "GitHub Organization, GitLab Group, BitBucket Workspace, Azure DevOps Organization",      value: "name + optional badge" },
          { property: "Cloud Services",  token: "AWS Service, GCP Service, Azure Service",                                                value: "name + account + region" },
          { property: "Cloud Accounts",  token: "AWS Account, GCP Account, Azure Account",                                                value: "account name + ID" },
          { property: "Web / API / App", token: "Web App, API, Application",                                                              value: "name only" },
        ]} />
      </SectionBlock>
    </SplitPage>
  );
}
