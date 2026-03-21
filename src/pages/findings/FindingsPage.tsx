import { useState, useMemo } from "react";

import { TabGroup }                    from "../../../components/navigation/TabGroup";
import { SearchInput }                 from "../../../components/fields/SearchInput";
import { SelectInput }                 from "../../../components/fields/SelectInput";
import { Button }                      from "../../../components/interactions/Button";
import { Checkbox }                    from "../../../components/interactions/Checkbox";
import { TableHeaderCell, type SortDirection } from "../../../components/tables/TableHeaderCell";
import { ResourceItem, type ResourceType }     from "../../../components/tables/ResourceItem";
import { BadgePriority, type PriorityScore }   from "../../../components/badges/BadgePriority";
import { BadgeStatus, type BadgeStatusValue }  from "../../../components/badges/BadgeStatus";
import { IconWrapper }                 from "../../../components/layout/IconWrapper";
import { Pagination }                  from "../../../components/navigation/Pagination";
import { Card }                        from "../../../components/layout/Card";
import { DropdownMenu }                from "../../../components/overlays/DropdownMenu";

import { IconX }            from "../../../components/icons/usecases/IconX";
import { IconIgnore }       from "../../../components/icons/usecases/IconIgnore";
import { IconTicket }       from "../../../components/icons/usecases/IconTicket";
import { IconEdit }         from "../../../components/icons/usecases/IconEdit";
import { IconHamburger }    from "../../../components/icons/usecases/IconHamburger";
import { IconDownload }     from "../../../components/icons/usecases/IconDownload";
import { IconFilter }       from "../../../components/icons/usecases/IconFilter";

import { IconSAST }              from "../../../components/icons/finding_type/IconSAST";
import { IconDAST }              from "../../../components/icons/finding_type/IconDAST";
import { IconSCA }               from "../../../components/icons/finding_type/IconSCA";
import { IconCloudSecurity }     from "../../../components/icons/finding_type/IconCloudSecurity";
import { IconSecretDetection }   from "../../../components/icons/finding_type/IconSecretDetection";
import { IconContainerSecurity } from "../../../components/icons/finding_type/IconContainerSecurity";
import { IconIaCSecurity }       from "../../../components/icons/finding_type/IconIaCSecurity";
import { IconGitSecurity }       from "../../../components/icons/finding_type/IconGitSecurity";
import { IconLicenseCheck }      from "../../../components/icons/finding_type/IconLicenseCheck";

import styles from "./FindingsPage.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type FindingResource = {
  type: ResourceType;
  name?: string;
  prefix?: string;
  detail?: string;
  accountName?: string;
  accountId?: string;
  isNew?: boolean;
};

type Finding = {
  id: string;
  name: string;
  location: string;
  findingType: string;
  resource: FindingResource;
  priorityScore: number;
  firstDetected: string;
  status: BadgeStatusValue;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

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

function getPriorityTier(score: number): PriorityScore {
  if (score >= 80) return "p1";
  if (score >= 40) return "p2";
  return "p3";
}

const TYPE_OPTIONS = [
  { label: "SAST",              value: "SAST" },
  { label: "DAST",              value: "DAST" },
  { label: "SCA",               value: "SCA" },
  { label: "Cloud Security",    value: "CLOUD" },
  { label: "Secret Detection",  value: "SECRET" },
  { label: "Container",         value: "CONTAINER" },
  { label: "IAC Security",      value: "IAC" },
  { label: "Git Security",      value: "GIT" },
  { label: "License",           value: "LICENSE" },
];

const SEVERITY_OPTIONS = [
  { label: "Critical", value: "critical" },
  { label: "High",     value: "high" },
  { label: "Medium",   value: "medium" },
  { label: "Low",      value: "low" },
];

const STATUS_OPTIONS = [
  { label: "Open",     value: "open" },
  { label: "Ignored",  value: "ignored" },
  { label: "Resolved", value: "fixed" },
];

const TEAM_OPTIONS = [
  { label: "Team Alpha",    value: "alpha" },
  { label: "Team Beta",     value: "beta" },
  { label: "Security Team", value: "security" },
  { label: "Platform",      value: "platform" },
];

const SAVED_VIEWS = [
  "All Open Findings",
  "P1 Critical Only",
  "My Team - This Week",
  "Cloud Misconfigurations",
  "Unassigned Secrets",
];

// ─── Mock Data ────────────────────────────────────────────────────────────────

const FINDINGS: Finding[] = [
  {
    id: "f1",
    name: "PyYAML insecure deserialization of untrusted input",
    location: "./src/utils/config.py#42-58",
    findingType: "SAST",
    resource: { type: "GitHub Repository", name: "jit-product", prefix: "jit-security/", detail: "main" },
    priorityScore: 95,
    firstDetected: "Jun 12, 2025",
    status: "open",
  },
  {
    id: "f2",
    name: "DOM-based XSS via unsanitized location.href",
    location: "./public/scripts/app.js#88",
    findingType: "DAST",
    resource: { type: "Web App", name: "https://app.acme.io" },
    priorityScore: 91,
    firstDetected: "Jul 8, 2025",
    status: "open",
  },
  {
    id: "f3",
    name: "S3 bucket with public read access enabled",
    location: "S3://prod-data-bucket",
    findingType: "CLOUD",
    resource: { type: "AWS Account", accountName: "Acme Production", accountId: "987654321012" },
    priorityScore: 88,
    firstDetected: "Jun 23, 2025",
    status: "open",
  },
  {
    id: "f4",
    name: "Hardcoded AWS access key detected in source code",
    location: "./deployment/terraform/main.tf#19",
    findingType: "SECRET",
    resource: { type: "GitLab Project", name: "infra-automation", prefix: "acme-engineering/", detail: "release/2.3" },
    priorityScore: 82,
    firstDetected: "Aug 1, 2025",
    status: "open",
  },
  {
    id: "f5",
    name: "Log4Shell critical RCE vulnerability (CVE-2021-44228)",
    location: "./pom.xml#31",
    findingType: "SCA",
    resource: { type: "BitBucket Repository", name: "payments-service", prefix: "acme-workspace/", detail: "develop" },
    priorityScore: 76,
    firstDetected: "Jun 15, 2025",
    status: "open",
  },
  {
    id: "f6",
    name: "Container image running as root user",
    location: "./Dockerfile#5-8",
    findingType: "CONTAINER",
    resource: { type: "AWS Service", name: "ECS Cluster", accountName: "Acme Production", accountId: "987654321012", detail: "us-east-1" },
    priorityScore: 64,
    firstDetected: "Jul 30, 2025",
    status: "open",
  },
  {
    id: "f7",
    name: "Security group allows unrestricted inbound traffic",
    location: "./infra/network.tf#101-115",
    findingType: "IAC",
    resource: { type: "GCP Service", name: "Cloud VPC", accountName: "Acme GCP Prod", accountId: "acme-gcp-prod", detail: "us-central1" },
    priorityScore: 58,
    firstDetected: "Aug 3, 2025",
    status: "open",
  },
  {
    id: "f8",
    name: "SQL injection in user search endpoint",
    location: "POST /api/v2/users/search",
    findingType: "DAST",
    resource: { type: "API", name: "/api/v2/users" },
    priorityScore: 50,
    firstDetected: "Mar 30, 2025",
    status: "open",
  },
  {
    id: "f9",
    name: "Branch protection rules not enforced on default branch",
    location: "Repository settings",
    findingType: "GIT",
    resource: { type: "GitHub Organization", name: "jit-security", isNew: true },
    priorityScore: 44,
    firstDetected: "Sep 2, 2025",
    status: "open",
  },
  {
    id: "f10",
    name: "GPL-3.0 license conflict in production dependency",
    location: "./package.json#88",
    findingType: "LICENSE",
    resource: { type: "GCP Account", accountName: "Acme GCP Dev", accountId: "acme-gcp-dev" },
    priorityScore: 35,
    firstDetected: "Aug 5, 2025",
    status: "open",
  },
  {
    id: "f11",
    name: "Insecure Math.random() used for token generation",
    location: "./src/auth/tokens.js#23",
    findingType: "SAST",
    resource: { type: "GitHub Repository", name: "frontend-app", prefix: "jit-security/", detail: "main" },
    priorityScore: 28,
    firstDetected: "Sep 10, 2025",
    status: "open",
  },
  {
    id: "f12",
    name: "Outdated dependency: lodash@4.17.4 (prototype pollution)",
    location: "./package-lock.json",
    findingType: "SCA",
    resource: { type: "Azure DevOps Repository", name: "microservice-auth", prefix: "acme-devops/", detail: "feature/auth-v2" },
    priorityScore: 22,
    firstDetected: "May 14, 2025",
    status: "ignored",
  },
  {
    id: "f13",
    name: "Django DEBUG mode enabled in production configuration",
    location: "./settings/production.py#12",
    findingType: "SAST",
    resource: { type: "Application", name: "Admin Dashboard" },
    priorityScore: 18,
    firstDetected: "Jun 3, 2025",
    status: "ignored",
  },
  {
    id: "f14",
    name: "Unencrypted storage account with sensitive data",
    location: "Azure Storage: prod-backups",
    findingType: "CLOUD",
    resource: { type: "Azure Account", accountName: "Acme Azure Prod", accountId: "azure-prod-sub" },
    priorityScore: 15,
    firstDetected: "Apr 17, 2025",
    status: "fixed",
  },
  {
    id: "f15",
    name: "Missing Content-Security-Policy response header",
    location: "./nginx.conf#34",
    findingType: "IAC",
    resource: { type: "Azure Service", name: "Application Gateway", accountName: "Acme Azure Prod", accountId: "azure-prod-sub", detail: "westeurope" },
    priorityScore: 12,
    firstDetected: "Mar 24, 2025",
    status: "fixed",
  },
];

const TAB_STATUS: BadgeStatusValue[] = ["open", "ignored", "fixed"];
const TAB_COUNTS = {
  open:    FINDINGS.filter(f => f.status === "open").length,
  ignored: FINDINGS.filter(f => f.status === "ignored").length,
  fixed:   FINDINGS.filter(f => f.status === "fixed").length,
};

// ─── Ugly: Saved Views Dropdown ───────────────────────────────────────────────
// TODO: Build SavedViewsDropdown as a proper design system component.
// This native <select> is intentionally ugly to make that clear.

function UglySavedViewsDropdown() {
  const [value, setValue] = useState(SAVED_VIEWS[0]);
  return (
    <div className={styles.uglySavedViewsContainer} title="TODO: Build SavedViewsDropdown in design system">
      <span>⭐</span>
      <select value={value} onChange={e => setValue(e.target.value)} style={{ fontFamily: "monospace", fontSize: "12px" }}>
        {SAVED_VIEWS.map(v => <option key={v} value={v}>{v}</option>)}
      </select>
    </div>
  );
}

// ─── Ugly: Summary Stat Card ──────────────────────────────────────────────────
// TODO: Build SummaryCard (icon + large number + label + subtitle) in design system.
// Using Card as container but inner layout is raw HTML - intentionally unstyled.

type UglySummaryCardProps = {
  number: number;
  label: string;
  subtitle: string;
};

function UglySummaryCard({ number, label, subtitle }: UglySummaryCardProps) {
  return (
    <Card padding="md">
      {/* TODO: This needs a proper SummaryCard component with icon slot, number, label, subtitle */}
      <div className={styles.uglyCardContent}>
        <h2>{number}</h2>
        <p>{label}</p>
        <small>{subtitle}</small>
      </div>
    </Card>
  );
}

// ─── Ugly: Priority Breakdown Card ───────────────────────────────────────────
// TODO: Build PriorityBreakdownCard (P1/P2/P3 with proportional color bar) in design system.
// Note: FindingsBreakdown in the design system uses severity (critical/high/medium/low),
// not priority tiers (P1/P2/P3). A new variant is needed.

type PriorityCount = { p1: number; p2: number; p3: number };

function UglyPriorityCard({ p1, p2, p3 }: PriorityCount) {
  const total = p1 + p2 + p3;
  const pct = (n: number) => `${Math.round((n / total) * 100)}%`;
  return (
    <Card padding="md">
      {/* TODO: Build PriorityBreakdownCard in design system */}
      <div className={styles.uglyPriorityCard}>
        <table>
          <tbody>
            <tr>
              <td><strong>P1</strong></td>
              <td><strong>P2</strong></td>
              <td><strong>P3</strong></td>
            </tr>
            <tr>
              <td style={{ fontSize: "11px", color: "#999" }}>100-80</td>
              <td style={{ fontSize: "11px", color: "#999" }}>79-40</td>
              <td style={{ fontSize: "11px", color: "#999" }}>39-0</td>
            </tr>
            <tr>
              <td style={{ fontSize: "28px", fontWeight: 900 }}>{p1}</td>
              <td style={{ fontSize: "28px", fontWeight: 900 }}>{p2}</td>
              <td style={{ fontSize: "28px", fontWeight: 900 }}>{p3}</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.uglyPriorityBar}>
          <div style={{ width: pct(p1), background: "#e53e3e" }} />
          <div style={{ width: pct(p2), background: "#dd6b20" }} />
          <div style={{ width: pct(p3), background: "#d69e2e" }} />
        </div>
      </div>
    </Card>
  );
}

// ─── Findings Page ────────────────────────────────────────────────────────────

export function FindingsPage() {
  // Tab: 0=Open, 1=Ignored, 2=Resolved
  const [activeTab,    setActiveTab]    = useState(0);
  const [page,         setPage]         = useState(1);
  const [search,       setSearch]       = useState("");
  const [filterType,   setFilterType]   = useState("");
  const [filterSev,    setFilterSev]    = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterTeam,   setFilterTeam]   = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortCol,      setSortCol]      = useState<"priority" | "date" | null>(null);
  const [sortDir,      setSortDir]      = useState<"asc" | "desc">("desc");

  // ── Filtering + sorting ────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    const statusFilter = TAB_STATUS[activeTab];
    let result = FINDINGS.filter(f => f.status === statusFilter);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(f => f.name.toLowerCase().includes(q));
    }

    if (filterType) {
      result = result.filter(f => f.findingType === filterType);
    }

    if (sortCol === "priority") {
      result = [...result].sort((a, b) =>
        sortDir === "asc"
          ? a.priorityScore - b.priorityScore
          : b.priorityScore - a.priorityScore
      );
    }

    return result;
  }, [activeTab, search, filterType, sortCol, sortDir]);

  const totalPages  = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const allSelected = pageItems.length > 0 && pageItems.every(f => selectedRows.has(f.id));

  // ── Event handlers ─────────────────────────────────────────────────────────

  function handleTabChange(index: number) {
    setActiveTab(index);
    setPage(1);
    setSelectedRows(new Set());
  }

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleFilter(setter: (v: string) => void) {
    return (value: string) => {
      setter(value);
      setPage(1);
    };
  }

  function clearFilters() {
    setSearch("");
    setFilterType("");
    setFilterSev("");
    setFilterStatus("");
    setFilterTeam("");
    setPage(1);
  }

  function toggleSort(col: "priority" | "date") {
    if (sortCol !== col) {
      setSortCol(col);
      setSortDir("desc");
    } else if (sortDir === "desc") {
      setSortDir("asc");
    } else {
      setSortCol(null);
    }
  }

  function handleSelectAll(checked: boolean) {
    if (checked) {
      setSelectedRows(prev => new Set([...prev, ...pageItems.map(f => f.id)]));
    } else {
      setSelectedRows(prev => {
        const next = new Set(prev);
        pageItems.forEach(f => next.delete(f.id));
        return next;
      });
    }
  }

  function handleRowSelect(id: string, checked: boolean) {
    setSelectedRows(prev => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  // ── Priority breakdown counts ──────────────────────────────────────────────
  const p1 = FINDINGS.filter(f => f.priorityScore >= 80).length;
  const p2 = FINDINGS.filter(f => f.priorityScore >= 40 && f.priorityScore < 80).length;
  const p3 = FINDINGS.filter(f => f.priorityScore < 40).length;

  // ── Sort direction for headers ─────────────────────────────────────────────
  const prioritySortDir: SortDirection = sortCol === "priority" ? sortDir : "none";
  const dateSortDir:     SortDirection = sortCol === "date"     ? sortDir : "none";

  const hasActiveFilters = Boolean(search || filterType || filterSev || filterStatus || filterTeam);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div data-theme="light" className={styles.scroll}>
      <div className={styles.inner}>

        {/* Page header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Findings</h1>
          <div className={styles.headerRight}>
            {/* TODO: SavedViewsDropdown needs to be built in the design system */}
            <UglySavedViewsDropdown />
            <Button
              icon={<IconWrapper icon={IconDownload} size="sm" />}
            >
              Export to CSV
            </Button>
          </div>
        </div>

        {/* Status tabs */}
        <div className={styles.tabsRow}>
          <TabGroup
            tabs={[
              { label: "Open",     count: TAB_COUNTS.open },
              { label: "Ignored",  count: TAB_COUNTS.ignored },
              { label: "Resolved", count: TAB_COUNTS.fixed },
            ]}
            defaultSelected={0}
            onChange={handleTabChange}
          />
        </div>

        {/* Summary strip */}
        {/* TODO: SummaryCard and PriorityBreakdownCard need to be built in the design system */}
        <div className={styles.summaryStrip}>
          <div className={styles.summaryCardWrapper}>
            <UglySummaryCard number={14} label="New Findings" subtitle="In the last 7 days" />
          </div>
          <div className={styles.summaryCardWrapper}>
            <UglySummaryCard number={3} label="Findings Resolved" subtitle="In the last 7 days" />
          </div>
          <div className={styles.summaryCardWrapper}>
            <UglyPriorityCard p1={p1} p2={p2} p3={p3} />
          </div>
        </div>

        {/* Filter bar */}
        <div className={styles.filterBar}>
          <SearchInput
            placeholder="Search findings..."
            value={search}
            onChange={handleSearch}
          />
          <SelectInput
            placeholder="Type"
            options={TYPE_OPTIONS}
            value={filterType}
            onChange={handleFilter(setFilterType)}
          />
          <SelectInput
            placeholder="Severity"
            options={SEVERITY_OPTIONS}
            value={filterSev}
            onChange={handleFilter(setFilterSev)}
          />
          <SelectInput
            placeholder="Status"
            options={STATUS_OPTIONS}
            value={filterStatus}
            onChange={handleFilter(setFilterStatus)}
          />
          <SelectInput
            placeholder="Team"
            options={TEAM_OPTIONS}
            value={filterTeam}
            onChange={handleFilter(setFilterTeam)}
          />
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              icon={<IconWrapper icon={IconX} size="sm" />}
              onClick={clearFilters}
            >
              Clear all
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            icon={<IconWrapper icon={IconFilter} size="sm" />}
          >
            Save view
          </Button>
        </div>

        {/* Findings table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <TableHeaderCell column="checkbox" checked={allSelected} onCheck={handleSelectAll} />
                <th className={styles.tdType} />
                <TableHeaderCell column="first"   label="Finding" />
                <TableHeaderCell column="regular" label="Resource" />
                <TableHeaderCell column="regular" label="Priority" sort={prioritySortDir} onSort={() => toggleSort("priority")} />
                <TableHeaderCell column="regular" label="First Detected" sort={dateSortDir} onSort={() => toggleSort("date")} />
                <TableHeaderCell column="regular" label="Status" />
                <TableHeaderCell column="actions" />
              </tr>
            </thead>

            <tbody className={styles.tbody}>
              {pageItems.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: "var(--space-xl)", textAlign: "center", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", fontSize: "14px" }}>
                    No findings match your search.
                  </td>
                </tr>
              ) : (
                pageItems.map(finding => {
                  const TypeIcon = FINDING_TYPE_ICON[finding.findingType] ?? IconSAST;
                  return (
                    <tr key={finding.id}>

                      {/* Checkbox */}
                      <td className={styles.tdCheckbox}>
                        <Checkbox
                          checked={selectedRows.has(finding.id)}
                          onChange={checked => handleRowSelect(finding.id, checked)}
                        />
                      </td>

                      {/* Finding type icon */}
                      <td className={styles.tdType}>
                        <IconWrapper icon={TypeIcon} size="sm" />
                      </td>

                      {/* Finding name + location */}
                      <td className={styles.td}>
                        <p className={styles.findingName}>{finding.name}</p>
                        <p className={styles.findingLocation}>{finding.location}</p>
                      </td>

                      {/* Resource */}
                      <td className={styles.td}>
                        <ResourceItem {...finding.resource} />
                      </td>

                      {/* Priority score */}
                      <td className={styles.td}>
                        <BadgePriority
                          priorityScore={getPriorityTier(finding.priorityScore)}
                          text={String(finding.priorityScore)}
                        />
                      </td>

                      {/* First detected */}
                      <td className={styles.td} style={{ whiteSpace: "nowrap", fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
                        {finding.firstDetected}
                      </td>

                      {/* Status */}
                      <td className={styles.td}>
                        <BadgeStatus status={finding.status} />
                      </td>

                      {/* Row actions */}
                      <td className={styles.tdActions}>
                        <div className={styles.rowActions}>
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<IconWrapper icon={IconIgnore} size="sm" />}
                            ariaLabel="Ignore finding"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<IconWrapper icon={IconTicket} size="sm" />}
                            ariaLabel="Create ticket"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<IconWrapper icon={IconEdit} size="sm" />}
                            ariaLabel="View fix suggestion"
                          />
                          <DropdownMenu
                            trigger={
                              <Button
                                variant="ghost"
                                size="sm"
                                icon={<IconWrapper icon={IconHamburger} size="sm" />}
                                ariaLabel="More actions"
                              />
                            }
                            items={[
                              { label: "View details",  onClick: () => {} },
                              { label: "Share",         onClick: () => {} },
                              { label: "Ask AI",        onClick: () => {} },
                              { label: "Delete",        onClick: () => {}, destructive: true },
                            ]}
                            align="right"
                          />
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.paginationRow}>
          <Pagination
            page={page}
            total={totalPages}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            onChange={setPage}
          />
        </div>

      </div>
    </div>
  );
}
