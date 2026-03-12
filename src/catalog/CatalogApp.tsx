import { useState } from "react";
import { Sidebar, type SectionId } from "./Sidebar";

import { ColorsSection }        from "./sections/ColorsSection";
import { TypographySection }    from "./sections/TypographySection";
import { SpacingSection }       from "./sections/SpacingSection";
import { RadiusSection }        from "./sections/RadiusSection";
import { IconCategorySection }  from "./sections/IconCategorySection";
import { BadgeStatusSection }   from "./sections/BadgeStatusSection";
import { BadgeSeveritySection } from "./sections/BadgeSeveritySection";
import { BadgePrioritySection } from "./sections/BadgePrioritySection";
import { ButtonSection }        from "./sections/ButtonSection";
import { DividerSection }       from "./sections/DividerSection";
import { TextInputSection }     from "./sections/TextInputSection";
import { SelectInputSection }   from "./sections/SelectInputSection";
import { SearchInputSection }   from "./sections/SearchInputSection";
import { IconWrapperSection }   from "./sections/IconWrapperSection";
import { LinkSection }          from "./sections/LinkSection";
import { TooltipSection }       from "./sections/TooltipSection";
import { TabSection }           from "./sections/TabSection";

export function CatalogApp() {
  const [active, setActive] = useState<SectionId>("button");

  function renderSection() {
    switch (active) {
      // Foundation
      case "colors":     return <ColorsSection />;
      case "typography": return <TypographySection />;
      case "spacing":    return <SpacingSection />;
      case "radius":     return <RadiusSection />;

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

      // Atoms — Badges
      case "badge-status":    return <BadgeStatusSection />;
      case "badge-severity":  return <BadgeSeveritySection />;
      case "badge-priority":  return <BadgePrioritySection />;
      case "button":        return <ButtonSection />;
      case "divider":       return <DividerSection />;
      case "fields-text":   return <TextInputSection />;
      case "fields-select": return <SelectInputSection />;
      case "fields-search": return <SearchInputSection />;
      case "icon-wrapper":  return <IconWrapperSection />;
      case "link":          return <LinkSection />;
      case "tooltip":       return <TooltipSection />;

      // Molecules
      case "tab": return <TabSection />;
    }
  }

  return (
    <div style={{ fontFamily: "'Open Sans', system-ui, sans-serif" }}>
      <Sidebar active={active} onSelect={setActive} />
      <main style={{ marginLeft: "220px", minHeight: "100vh", overflow: "auto", backgroundColor: "#FAFAFA" }}>
        {renderSection()}
      </main>
    </div>
  );
}
