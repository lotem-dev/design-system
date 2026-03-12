import { useState } from "react";
import { Tab } from "./Tab";
import styles from "./TabGroup.module.css";

type TabItem = {
  label: string;
  count?: number;
};

type TabGroupProps = {
  tabs: TabItem[];
  defaultSelected?: number;
  onChange?: (index: number) => void;
};

export function TabGroup({ tabs, defaultSelected = 0, onChange }: TabGroupProps) {
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
