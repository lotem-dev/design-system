import { useState } from "react";
import { Sidebar, type SectionId } from "./Sidebar";
import { BreadcrumbNav } from "./ui/BreadcrumbNav";

import { GlobalsCssSection }       from "./sections/GlobalsCssSection";
import { ColorsSection }           from "./sections/ColorsSection";
import { TypographySection }       from "./sections/TypographySection";
import { TextSection }             from "./sections/TextSection";
import { SpacingSection }          from "./sections/SpacingSection";
import { RadiusSection }           from "./sections/RadiusSection";
import { IconCategorySection }     from "./sections/IconCategorySection";
import { IllustrationsSection }    from "./sections/IllustrationsSection";

import { ButtonSection }           from "./sections/ButtonSection";
import { LinkSection }             from "./sections/LinkSection";

import { TextInputSection }        from "./sections/TextInputSection";
import { SelectInputSection }      from "./sections/SelectInputSection";
import { SearchInputSection }      from "./sections/SearchInputSection";
import { CheckboxSection }         from "./sections/CheckboxSection";
import { RadioSection }            from "./sections/RadioSection";
import { ToggleSection }           from "./sections/ToggleSection";
import { TextareaSection }         from "./sections/TextareaSection";
import { FormFieldSection }        from "./sections/FormFieldSection";

import { BadgeStatusSection }      from "./sections/BadgeStatusSection";
import { BadgeSeveritySection }    from "./sections/BadgeSeveritySection";
import { BadgePrioritySection }    from "./sections/BadgePrioritySection";
import { IconWrapperSection }      from "./sections/IconWrapperSection";

import { FindingsBreakdownSection }  from "./sections/FindingsBreakdownSection";
import { PriorityGaugeSection }      from "./sections/PriorityGaugeSection";
import { ResourceItemSection }       from "./sections/ResourceItemSection";
import { TableHeaderCellSection }    from "./sections/TableHeaderCellSection";
import { TableSection }              from "./sections/TableSection";
import { PaginationSection }         from "./sections/PaginationSection";

import { AlertSection }            from "./sections/AlertSection";
import { ToastSection }            from "./sections/ToastSection";
import { SpinnerSection }          from "./sections/SpinnerSection";
import { SkeletonSection }         from "./sections/SkeletonSection";
import { ProgressSection }         from "./sections/ProgressSection";
import { EmptyStateSection }       from "./sections/EmptyStateSection";

import { TooltipSection }          from "./sections/TooltipSection";
import { DropdownMenuSection }     from "./sections/DropdownMenuSection";
import { ModalSection }            from "./sections/ModalSection";

import { TabSection }              from "./sections/TabSection";
import { BreadcrumbSection }       from "./sections/BreadcrumbSection";
import { DividerSection }          from "./sections/DividerSection";

import { CardSection }             from "./sections/CardSection";
import { ChatFieldSection }        from "./sections/ChatFieldSection";

export function CatalogApp() {
  const [active, setActive] = useState<SectionId>("button");

  function renderSection() {
    switch (active) {
      // Styles
      case "globals-css": return <GlobalsCssSection />;
      case "colors":      return <ColorsSection />;
      case "typography":  return <TypographySection />;
      case "spacing":     return <SpacingSection />;
      case "radius":      return <RadiusSection />;

      // Icons
      case "icons-usecases":
      case "icons-chevrons":
      case "icons-sorting":
      case "icons-dropdown":
      case "icons-finding-type":
      case "icons-sidebar":
      case "icons-resources":
      case "icons-brand":
        return <IconCategorySection categoryId={active} />;

      // Illustrations
      case "illustrations": return <IllustrationsSection />;

      // Foundation
      case "text":    return <TextSection />;
      case "link":    return <LinkSection />;
      case "divider": return <DividerSection />;

      // Interactions
      case "button":          return <ButtonSection />;
      case "fields-checkbox": return <CheckboxSection />;
      case "fields-radio":    return <RadioSection />;
      case "toggle":          return <ToggleSection />;

      // Fields
      case "fields-text":   return <TextInputSection />;
      case "fields-select": return <SelectInputSection />;
      case "fields-search": return <SearchInputSection />;
      case "textarea":      return <TextareaSection />;
      case "chat-field":    return <ChatFieldSection />;
      case "form-field":    return <FormFieldSection />;

      // Badges
      case "badge-status":   return <BadgeStatusSection />;
      case "badge-severity": return <BadgeSeveritySection />;
      case "badge-priority": return <BadgePrioritySection />;

      // Tables
      case "table":             return <TableSection />;
      case "table-header-cell": return <TableHeaderCellSection />;
      case "resource-item":     return <ResourceItemSection />;

      // Visualization
      case "findings-breakdown": return <FindingsBreakdownSection />;
      case "priority-gauge":     return <PriorityGaugeSection />;
      case "spinner":            return <SpinnerSection />;
      case "skeleton":           return <SkeletonSection />;
      case "progress":           return <ProgressSection />;
      case "empty-state":        return <EmptyStateSection />;

      // Overlays
      case "tooltip":       return <TooltipSection />;
      case "dropdown-menu": return <DropdownMenuSection />;
      case "modal":         return <ModalSection />;
      case "alert":         return <AlertSection />;
      case "toast":         return <ToastSection />;

      // Navigation
      case "tab":        return <TabSection />;
      case "breadcrumb": return <BreadcrumbSection />;
      case "pagination": return <PaginationSection />;

      // Card
      case "card": return <CardSection />;

      // Icons - wrapper
      case "icon-wrapper": return <IconWrapperSection />;
    }
  }

  return (
    <div style={{ fontFamily: "'Open Sans', system-ui, sans-serif" }}>
      <Sidebar active={active} onSelect={setActive} />
      <main style={{ marginLeft: "244px", height: "100vh", overflow: "auto", backgroundColor: "#FFFFFF" }}>
        <BreadcrumbNav active={active} onSelect={setActive} />
        <div style={{ borderBottom: "1px solid #F4F4F5" }} />
        {renderSection()}
      </main>
    </div>
  );
}
