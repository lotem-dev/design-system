import type { SVGProps } from "react";
import styles from "./ResourceItem.module.css";

import { LogoGitHub }      from "../icons/brand/LogoGitHub";
import { LogoGitLab }      from "../icons/brand/LogoGitLab";
import { LogoBitbucket }   from "../icons/brand/LogoBitbucket";
import { LogoAzureDevOps } from "../icons/brand/LogoAzureDevOps";
import { LogoAWS }         from "../icons/brand/LogoAWS";
import { LogoGCP }         from "../icons/brand/LogoGCP";
import { LogoAzure }       from "../icons/brand/LogoAzure";
import { IconWeb }         from "../icons/resources_internal/IconWeb";
import { IconApi }         from "../icons/resources_internal/IconApi";
import { IconGenericApp }  from "../icons/resources_internal/IconGenericApp";

// ─── Types ────────────────────────────────────────────────

export type ResourceType =
  | "GitHub Repository"       | "GitLab Project"          | "BitBucket Repository"      | "Azure DevOps Repository"
  | "GitHub Organization"     | "GitLab Group"            | "BitBucket Workspace"        | "Azure DevOps Organization"
  | "AWS Service"             | "GCP Service"             | "Azure Service"
  | "AWS Account"             | "GCP Account"             | "Azure Account"
  | "Web App"                 | "API"                     | "Application";

export type ResourceItemProps = {
  type: ResourceType;
  /** Main name: repo name, service name, org name, app URL, etc. */
  name?: string;
  /** Org prefix shown above the name, e.g. "github-org/" */
  prefix?: string;
  /** Branch name (repos) or cloud region (cloud services) */
  detail?: string;
  /** Cloud account name */
  accountName?: string;
  /** Cloud account ID, shown in parens next to account name */
  accountId?: string;
  /** Show a "New!" badge next to the name */
  isNew?: boolean;
};

// ─── Icon map ────────────────────────────────────────────

type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

const ICON_MAP: Record<ResourceType, IconComponent> = {
  "GitHub Repository":        LogoGitHub,
  "GitHub Organization":      LogoGitHub,
  "GitLab Project":           LogoGitLab,
  "GitLab Group":             LogoGitLab,
  "BitBucket Repository":     LogoBitbucket,
  "BitBucket Workspace":      LogoBitbucket,
  "Azure DevOps Repository":  LogoAzureDevOps,
  "Azure DevOps Organization":LogoAzureDevOps,
  "AWS Service":              LogoAWS,
  "AWS Account":              LogoAWS,
  "GCP Service":              LogoGCP,
  "GCP Account":              LogoGCP,
  "Azure Service":            LogoAzure,
  "Azure Account":            LogoAzure,
  "Web App":                  IconWeb,
  "API":                      IconApi,
  "Application":              IconGenericApp,
};

// ─── Helpers ─────────────────────────────────────────────

const GIT_REPOS = new Set<ResourceType>([
  "GitHub Repository", "GitLab Project", "BitBucket Repository", "Azure DevOps Repository",
]);

const GIT_ORGS = new Set<ResourceType>([
  "GitHub Organization", "GitLab Group", "BitBucket Workspace", "Azure DevOps Organization",
]);

const CLOUD_SERVICES = new Set<ResourceType>(["AWS Service", "GCP Service", "Azure Service"]);
const CLOUD_ACCOUNTS = new Set<ResourceType>(["AWS Account", "GCP Account", "Azure Account"]);

function NewBadge() {
  return <span className={styles.newBadge}>New!</span>;
}

// ─── Component ───────────────────────────────────────────

export function ResourceItem({
  type,
  name,
  prefix,
  detail,
  accountName,
  accountId,
  isNew = false,
}: ResourceItemProps) {
  const Icon = ICON_MAP[type];

  const isGitRepo     = GIT_REPOS.has(type);
  const isGitOrg      = GIT_ORGS.has(type);
  const isCloudService = CLOUD_SERVICES.has(type);
  const isCloudAccount = CLOUD_ACCOUNTS.has(type);

  return (
    <div className={styles.wrapper}>
      <span className={styles.icon} aria-hidden="true">
        <Icon width={28} height={28} />
      </span>

      <div className={styles.text}>

        {/* Git repositories — prefix / name / branch */}
        {isGitRepo && (
          <>
            {prefix && <span className={styles.prefix}>{prefix}</span>}
            <span className={styles.nameRow}>
              {isNew && <NewBadge />}
              <span className={styles.name}>{name}</span>
            </span>
            {detail && <span className={styles.detail}>{detail}</span>}
          </>
        )}

        {/* Git orgs/groups — optional badge + name */}
        {isGitOrg && (
          <span className={styles.nameRow}>
            {isNew && <NewBadge />}
            <span className={styles.name}>{name}</span>
          </span>
        )}

        {/* Cloud services — service name / account / region */}
        {isCloudService && (
          <>
            <span className={styles.name}>{name}</span>
            {(accountName || accountId) && (
              <span className={styles.accountRow}>
                {accountName && <span className={styles.accountName}>{accountName}</span>}
                {accountId   && <span className={styles.accountId}>{accountId}</span>}
              </span>
            )}
            {detail && <span className={styles.detail}>{detail}</span>}
          </>
        )}

        {/* Cloud accounts — single line */}
        {isCloudAccount && (
          <span className={styles.name}>
            {accountName}{accountId ? ` ${accountId}` : ""}
          </span>
        )}

        {/* Web / API / Application — just the name */}
        {!isGitRepo && !isGitOrg && !isCloudService && !isCloudAccount && (
          <span className={styles.name}>{name}</span>
        )}

      </div>
    </div>
  );
}
