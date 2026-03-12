import { useState } from "react";
import { Sidebar, type SectionId } from "./Sidebar";
import { BadgeStatusSection }  from "./sections/BadgeStatusSection";
import { ColorsSection }       from "./sections/ColorsSection";
import { TypographySection }   from "./sections/TypographySection";
import { SpacingSection }      from "./sections/SpacingSection";
import { IconsSection }        from "./sections/IconsSection";
import { DividerSection }      from "./sections/DividerSection";
import { IconWrapperSection }  from "./sections/IconWrapperSection";
import { LinkSection }         from "./sections/LinkSection";
import { ButtonSection }       from "./sections/ButtonSection";
import { FieldsSection }       from "./sections/FieldsSection";
import { TooltipSection }      from "./sections/TooltipSection";
import { TabSection }          from "./sections/TabSection";

export function CatalogApp() {
  const [active, setActive] = useState<SectionId>("button");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  function renderSection() {
    switch (active) {
      case "colors":       return <ColorsSection />;
      case "typography":   return <TypographySection />;
      case "spacing":      return <SpacingSection />;
      case "icons":        return <IconsSection />;
      case "badge-status": return <BadgeStatusSection />;
      case "button":       return <ButtonSection />;
      case "divider":      return <DividerSection />;
      case "icon-wrapper": return <IconWrapperSection />;
      case "link":         return <LinkSection />;
      case "fields":       return <FieldsSection />;
      case "tooltip":      return <TooltipSection />;
      case "tab":          return <TabSection />;
    }
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "system-ui, sans-serif" }}>
      <Sidebar active={active} onSelect={setActive} theme={theme} onToggleTheme={() => setTheme(t => t === "light" ? "dark" : "light")} />
      <main
        data-theme={theme}
        style={{ flex: 1, overflow: "auto", backgroundColor: theme === "dark" ? "#09090B" : "#FAFAFA" }}
      >
        <div style={{ maxWidth: "800px", padding: "48px 48px" }}>
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
