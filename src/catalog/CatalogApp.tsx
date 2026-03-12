import { useState, useEffect } from "react";
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
import { TableSection }         from "./sections/TableSection";

export function CatalogApp() {
  const [active, setActive] = useState<SectionId>("button");
  const [theme, setTheme]   = useState<"light" | "dark">("light");

  // Applies data-theme to the document root so all CSS variables
  // (colors, backgrounds, etc.) update globally when the theme toggles.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function renderSection() {
    switch (active) {
      // Foundation
      case "colors":     return <ColorsSection theme={theme} />;
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
      case "table":         return <TableSection />;
      case "tooltip":       return <TooltipSection />;

      // Molecules
      case "tab": return <TabSection />;
    }
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
      <Sidebar active={active} onSelect={setActive} theme={theme} onToggleTheme={() => setTheme(t => t === "light" ? "dark" : "light")} />
      <main
        data-theme={theme}
        style={{ flex: 1, overflow: "auto", backgroundColor: theme === "dark" ? "#09090B" : "#FAFAFA" }}
      >
        {renderSection()}
      </main>
    </div>
  );
}
