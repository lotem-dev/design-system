import { useEffect } from "react";

import { Button }          from "../../../components/interactions/Button";
import { BadgeStatus }     from "../../../components/badges/BadgeStatus";
import { BadgeSeverity }   from "../../../components/badges/BadgeSeverity";
import { BadgePriority }   from "../../../components/badges/BadgePriority";
import { PriorityGauge }   from "../../../components/visualization/PriorityGauge";
import { ResourceItem }    from "../../../components/tables/ResourceItem";
import { IconWrapper }     from "../../../components/layout/IconWrapper";
import { Card }            from "../../../components/layout/Card";
import { BrandLogoWrapper } from "../../../components/atoms/BrandLogoWrapper";
import { DropdownMenu }    from "../../../components/overlays/DropdownMenu";

import { IconX }           from "../../../components/icons/usecases/IconX";
import { IconIgnore }      from "../../../components/icons/usecases/IconIgnore";
import { IconTicket }      from "../../../components/icons/usecases/IconTicket";
import { IconEdit }        from "../../../components/icons/usecases/IconEdit";
import { IconAskAi }       from "../../../components/icons/usecases/IconAskAi";
import { IconShare }       from "../../../components/icons/usecases/IconShare";
import { IconExternalLink } from "../../../components/icons/usecases/IconExternalLink";

import { IconSAST }              from "../../../components/icons/finding_type/IconSAST";
import { IconDAST }              from "../../../components/icons/finding_type/IconDAST";
import { IconSCA }               from "../../../components/icons/finding_type/IconSCA";
import { IconCloudSecurity }     from "../../../components/icons/finding_type/IconCloudSecurity";
import { IconSecretDetection }   from "../../../components/icons/finding_type/IconSecretDetection";
import { IconContainerSecurity } from "../../../components/icons/finding_type/IconContainerSecurity";
import { IconIaCSecurity }       from "../../../components/icons/finding_type/IconIaCSecurity";
import { IconGitSecurity }       from "../../../components/icons/finding_type/IconGitSecurity";
import { IconLicenseCheck }      from "../../../components/icons/finding_type/IconLicenseCheck";

import { LogoJira }    from "../../../components/icons/brand/LogoJira";
import { LogoLinear }  from "../../../components/icons/brand/LogoLinear";
import { LogoGitHub }  from "../../../components/icons/brand/LogoGitHub";

import type { ResourceType } from "../../../components/tables/ResourceItem";
import type { BadgeStatusValue } from "../../../components/badges/BadgeStatus";

import styles from "./FindingDrawer.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type SeverityScale = "critical" | "high" | "medium" | "low";

type FindingResource = {
  type: ResourceType;
  name?: string;
  prefix?: string;
  detail?: string;
  accountName?: string;
  accountId?: string;
  isNew?: boolean;
};

export type DrawerFinding = {
  id: string;
  name: string;
  location: string;
  findingType: string;
  resource: FindingResource;
  priorityScore: number;
  firstDetected: string;
  status: BadgeStatusValue;
  // Drawer-specific fields
  severity: SeverityScale;
  cweId: string;
  cweLabel: string;
  description: string;
  ticket?: {
    tool: "jira" | "linear" | "github";
    name: string;
    id: string;
    createdDate: string;
  };
  teams: string[];
  scanTool: string;
  scanDate: string;
  scanFirstSeen: string;
};

type Props = {
  finding: DrawerFinding;
  onClose: () => void;
};

// ─── Constants ────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FINDING_TYPE_ICON: Record<string, React.ComponentType<any>> = {
  SAST:      IconSAST,
  DAST:      IconDAST,
  SCA:       IconSCA,
  CLOUD:     IconCloudSecurity,
  SECRET:    IconSecretDetection,
  CONTAINER: IconContainerSecurity,
  IAC:       IconIaCSecurity,
  GIT:       IconGitSecurity,
  LICENSE:   IconLicenseCheck,
};

const FINDING_TYPE_LABEL: Record<string, string> = {
  SAST:      "SAST",
  DAST:      "DAST",
  SCA:       "SCA",
  CLOUD:     "Cloud Security",
  SECRET:    "Secret Detection",
  CONTAINER: "Container Security",
  IAC:       "IaC Security",
  GIT:       "Git Security",
  LICENSE:   "License Check",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TICKET_LOGO: Record<string, React.ComponentType<any>> = {
  jira:   LogoJira,
  linear: LogoLinear,
  github: LogoGitHub,
};

const TICKET_LABEL: Record<string, string> = {
  jira:   "Jira",
  linear: "Linear",
  github: "GitHub Issue",
};

function getPriorityTier(score: number): "p1" | "p2" | "p3" {
  if (score >= 80) return "p1";
  if (score >= 40) return "p2";
  return "p3";
}

function getPriorityLabel(score: number): "P1" | "P2" | "P3" {
  if (score >= 80) return "P1";
  if (score >= 40) return "P2";
  return "P3";
}

// ─── Finding Drawer ───────────────────────────────────────────────────────────

export function FindingDrawer({ finding, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const TypeIcon = FINDING_TYPE_ICON[finding.findingType] ?? IconSAST;
  const typeLabel = FINDING_TYPE_LABEL[finding.findingType] ?? finding.findingType;

  return (
    <>
      {/* Dimmed background overlay - click to close */}
      <div className={styles.overlay} onClick={onClose} />

      <div data-theme="light" className={styles.drawer} role="dialog" aria-modal="true">

        {/* ── Header ────────────────────────────────────────────── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <BadgeStatus status={finding.status} />
          </div>

          <div className={styles.headerActions}>
            <Button
              variant="ghost"
              size="sm"
              icon={<IconWrapper icon={IconIgnore} size="sm" />}
            >
              Ignore
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={<IconWrapper icon={IconTicket} size="sm" />}
            >
              Open a Ticket
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<IconWrapper icon={IconEdit} size="sm" />}
            >
              Quick Fix
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={<IconWrapper icon={IconAskAi} size="sm" />}
            >
              Ask AI
            </Button>
            <DropdownMenu
              trigger={
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<IconWrapper icon={IconShare} size="sm" />}
                  ariaLabel="Share"
                />
              }
              items={[
                { label: "Copy link",        onClick: () => {} },
                { label: "Copy finding ID",  onClick: () => {} },
                { label: "Export as JSON",   onClick: () => {} },
              ]}
              align="right"
            />
            <Button
              variant="ghost"
              size="sm"
              icon={<IconWrapper icon={IconX} size="sm" />}
              ariaLabel="Close"
              onClick={onClose}
            />
          </div>
        </div>

        {/* ── Body ──────────────────────────────────────────────── */}
        <div className={styles.body}>

          {/* Title + path + description */}
          <div className={styles.titleBlock}>
            <h2 className={styles.findingTitle}>{finding.name}</h2>
            {/* TODO: Build a Link component in the design system */}
            <a href="#" className={styles.uglyPathLink} title="TODO: Link component needed">
              <IconWrapper icon={IconExternalLink} size="sm" style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
              {finding.location}
            </a>
            <p className={styles.description}>{finding.description}</p>
          </div>

          {/* Meta strip: priority gauge + severity + type + CWE */}
          <div className={styles.metaStrip}>
            <div className={styles.metaItem}>
              <PriorityGauge
                score={finding.priorityScore}
                priority={getPriorityLabel(finding.priorityScore)}
              />
              <BadgePriority
                priorityScore={getPriorityTier(finding.priorityScore)}
                text={String(finding.priorityScore)}
              />
            </div>

            <div className={styles.metaDivider} />

            <div className={styles.metaItem}>
              <BadgeSeverity scale={finding.severity} size="sm" />
            </div>

            <div className={styles.metaDivider} />

            <div className={styles.metaItem} style={{ gap: "var(--space-xs)" }}>
              <IconWrapper icon={TypeIcon} size="sm" />
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "var(--text-secondary)" }}>
                {typeLabel}
              </span>
              {/* TODO: Build Link component - using ugly link for CWE */}
              <a href="#" className={styles.uglyCweLink} title="TODO: Link component needed">
                {finding.cweId}
              </a>
            </div>
          </div>

          {/* Linked ticket */}
          {finding.ticket ? (
            <div>
              <p className={styles.sectionLabel}>Linked Ticket</p>
              <Card padding="sm">
                <div className={styles.ticketRow}>
                  <BrandLogoWrapper
                    as={TICKET_LOGO[finding.ticket.tool]}
                    size="md"
                    title={TICKET_LABEL[finding.ticket.tool]}
                  />
                  <div className={styles.ticketInfo}>
                    <p className={styles.ticketName}>{finding.ticket.name}</p>
                    <p className={styles.ticketMeta}>
                      {TICKET_LABEL[finding.ticket.tool]} - {finding.ticket.id} - Created {finding.ticket.createdDate}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<IconWrapper icon={IconExternalLink} size="sm" />}
                    ariaLabel="Open ticket"
                  />
                </div>
              </Card>
            </div>
          ) : (
            <div>
              <p className={styles.sectionLabel}>Linked Ticket</p>
              <Card padding="sm">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--text-tertiary)" }}>
                    No ticket linked to this finding.
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<IconWrapper icon={IconTicket} size="sm" />}
                  >
                    Open a Ticket
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Context graph - ugly placeholder */}
          {/* TODO: Build ContextGraph component. This is a graph showing */}
          {/* how this finding connects to the resource, team, risk, and fix path. */}
          <div>
            <p className={styles.sectionLabel}>Context Graph</p>
            <div className={styles.uglyContextGraph}>
              <h3>ContextGraph</h3>
              <p>TODO: Build ContextGraph as a design system component.</p>
              <p>Shows connections: finding - resource - team - fix path - risk score.</p>
            </div>
          </div>

        </div>

        {/* ── Footer strip ──────────────────────────────────────── */}
        <div className={styles.footerStrip}>
          <div className={styles.footerRow}>
            <span className={styles.footerKey}>Resource</span>
            <div className={styles.footerValue}>
              <ResourceItem {...finding.resource} />
            </div>
          </div>
          <div className={styles.footerRow}>
            <span className={styles.footerKey}>Teams</span>
            <span className={styles.footerValue}>
              {finding.teams.join(", ")}
            </span>
          </div>
          <div className={styles.footerRow}>
            <span className={styles.footerKey}>Scan</span>
            <span className={styles.footerValue}>
              <strong>{finding.scanTool}</strong> - First seen {finding.scanFirstSeen} - Last scan {finding.scanDate}
            </span>
          </div>
        </div>

      </div>
    </>
  );
}
