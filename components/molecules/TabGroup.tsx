// TabGroup — a horizontal row of tabs that manages which tab is currently active.
// Renders a list of Tab components and tracks which one is selected internally.
// When the user clicks a tab, the active tab updates and an optional callback fires.
// Used at the top of views where content is split into distinct sections (e.g. Open / Fixed / Ignored).
import { useState } from "react";
import { Tab } from "./Tab";
import styles from "./TabGroup.module.css";

// Defines one tab entry in the list — a label and an optional count badge.
type TabItem = {
  label: string;
  count?: number;
};

type TabGroupProps = {
  // The full list of tabs to display, in order from left to right.
  tabs: TabItem[];
  // Which tab is active when the component first appears — identified by position (0 = first tab). Defaults to 0.
  defaultSelected?: number;
  // Called whenever the active tab changes — receives the index of the newly selected tab.
  onChange?: (index: number) => void;
};

export function TabGroup({ tabs, defaultSelected = 0, onChange }: TabGroupProps) {
  // Tracks which tab index is currently selected — starts at defaultSelected.
  const [selected, setSelected] = useState(defaultSelected);

  function handleSelect(index: number) {
    setSelected(index);
    onChange?.(index);
  }

  return (
    <div role="tablist" className={styles.tabgroup}>
      {tabs.map((tab, index) => (
        <Tab
          key={tab.label}
          label={tab.label}
          count={tab.count}
          selected={selected === index}
          onClick={() => handleSelect(index)}
        />
      ))}
    </div>
  );
}
