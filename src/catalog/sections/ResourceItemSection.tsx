import { useState } from "react";
import { ResourceItem, type ResourceType } from "../../../components/atoms/ResourceItem";
import { TokenTable } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import resourceItemTsx from "../../../components/atoms/ResourceItem.tsx?raw";
import resourceItemCss from "../../../components/atoms/ResourceItem.module.css?raw";

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

const EXAMPLE_PROPS: Record<ResourceType, object> = {
  "GitHub Repository":        { name: "my-repo",             prefix: "github-org/",                detail: "main" },
  "GitLab Project":           { name: "my-project",          prefix: "gitlab-group/",              detail: "main" },
  "BitBucket Repository":     { name: "my-repo",             prefix: "bitbucket-ws/",              detail: "main" },
  "Azure DevOps Repository":  { name: "my-repo",             prefix: "Azure DevOps Org/",          detail: "main" },
  "GitHub Organization":      { name: "GitHub Organization" },
  "GitLab Group":             { name: "GitLab Group" },
  "BitBucket Workspace":      { name: "BitBucket Workspace" },
  "Azure DevOps Organization":{ name: "Azure DevOps Organization" },
  "AWS Service":              { name: "openasset_uploads",   accountName: "My AWS Account",        accountId: "(123456789)",   detail: "us-east-1" },
  "GCP Service":              { name: "my-gcp-service",      accountName: "My GCP Project",        accountId: "(proj-id)",    detail: "us-central1" },
  "Azure Service":            { name: "my-azure-service",    accountName: "My Azure Sub",          accountId: "(sub-id)",     detail: "eastus" },
  "AWS Account":              { accountName: "My AWS Account",  accountId: "(123456789)" },
  "GCP Account":              { accountName: "My GCP Project",  accountId: "(proj-id)" },
  "Azure Account":            { accountName: "My Azure Sub",    accountId: "(sub-id)" },
  "Web App":                  { name: "web.example.com" },
  "API":                      { name: "api.example.com" },
  "Application":              { name: "My Application" },
};

function Playground() {
  const [type, setType]   = useState<ResourceType>("GitHub Repository");
  const [isNew, setIsNew] = useState(false);

  const exampleProps = EXAMPLE_PROPS[type];

  return (
    <PlaygroundShell
      preview={
        <ResourceItem type={type} isNew={isNew} {...exampleProps} />
      }
      controls={
        <>
          <ControlRow label="Type">
            {ALL_TYPES.map(t => (
              <Pill key={t} active={type === t} onClick={() => setType(t)}>{t}</Pill>
            ))}
          </ControlRow>
          <ControlRow label="Badge">
            <Pill active={!isNew} onClick={() => setIsNew(false)}>none</Pill>
            <Pill active={isNew}  onClick={() => setIsNew(true)}>New!</Pill>
          </ControlRow>
        </>
      }
    />
  );
}

export function ResourceItemSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>⚛️ Atom</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>ResourceItem</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Displays a resource (repository, cloud service, web app, etc.) with its logo and relevant metadata.
          17 resource types across 5 categories: Git repos, Git orgs, Cloud services, Cloud accounts, and Web/API/App.
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>

      <SectionBlock title="Props">
        <TokenTable rows={[
          { property: "type",        token: "ResourceType",  value: "—",     note: "Determines icon and text layout" },
          { property: "name",        token: "string",        value: "—",     note: "Main display name" },
          { property: "prefix",      token: "string",        value: "—",     note: "Org prefix shown above name (repos)" },
          { property: "detail",      token: "string",        value: "—",     note: "Branch name (repos) or region (cloud services)" },
          { property: "accountName", token: "string",        value: "—",     note: "Cloud account name" },
          { property: "accountId",   token: "string",        value: "—",     note: "Cloud account ID, shown in parens" },
          { property: "isNew",       token: "boolean",       value: "false", note: 'Shows a purple "New!" badge' },
        ]} />
      </SectionBlock>

      <SectionBlock title="Resource Types">
        <TokenTable rows={[
          { property: "Git Repos",      token: "GitHub Repository, GitLab Project, BitBucket Repository, Azure DevOps Repository",         value: "prefix + name + branch" },
          { property: "Git Orgs",       token: "GitHub Organization, GitLab Group, BitBucket Workspace, Azure DevOps Organization",        value: "name + optional badge" },
          { property: "Cloud Services", token: "AWS Service, GCP Service, Azure Service",                                                  value: "name + account + region" },
          { property: "Cloud Accounts", token: "AWS Account, GCP Account, Azure Account",                                                  value: "account name + ID" },
          { property: "Web / API / App",token: "Web App, API, Application",                                                                value: "name only" },
        ]} />
      </SectionBlock>
    </SplitPage>
  );
}
