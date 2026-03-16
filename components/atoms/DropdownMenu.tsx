// DropdownMenu — a floating list of actions triggered by clicking an element.
// Use for context menus, overflow action menus ("⋯"), and option lists.
// The menu opens/closes automatically and closes when you click outside.
import { useState, useRef, useEffect, type ReactNode } from "react";
import styles from "./DropdownMenu.module.css";

export type DropdownItem = {
  // The text shown for this menu item.
  label: string;
  // Called when the item is clicked.
  onClick: () => void;
  // When true, the item is shown at reduced opacity and cannot be clicked.
  disabled?: boolean;
  // When true, the item is shown in red — use for dangerous actions like "Delete".
  destructive?: boolean;
};

export type DropdownMenuProps = {
  // The element that opens the menu when clicked (e.g. a Button or icon).
  trigger: ReactNode;
  // The list of action items to show in the menu.
  items: DropdownItem[];
  // Which side of the trigger to anchor the menu. Defaults to "left".
  align?: "left" | "right";
};

export function DropdownMenu({ trigger, items, align = "left" }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close the menu when the user clicks anywhere outside of it
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.trigger} onClick={() => setOpen(prev => !prev)}>
        {trigger}
      </div>
      {open && (
        <div className={`${styles.menu} ${align === "right" ? styles.alignRight : styles.alignLeft}`}>
          {items.map((item, i) => (
            <button
              key={i}
              className={`${styles.item} ${item.destructive ? styles.destructive : ""}`}
              disabled={item.disabled}
              onClick={() => {
                if (!item.disabled) {
                  item.onClick();
                  setOpen(false);
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
