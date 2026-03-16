// Tooltip — a small floating label that provides additional context when hovering over an element.
// Can show a primary text line, an optional secondary text line below it, and an optional clickable link.
// The tooltip itself is just the content box — the trigger element and positioning are handled by the parent.
// Used for icon button labels, truncated text explanations, and inline documentation hints.
import styles from "./Tooltip.module.css";

type TooltipProps = {
  // The main text shown in the tooltip.
  text: string;
  // An optional second line of text shown below the primary text.
  secondaryText?: string;
  // The label for an optional link shown at the bottom of the tooltip.
  linkLabel?: string;
  // The URL the link navigates to — only shown if both linkLabel and linkHref are provided together.
  linkHref?: string;
};

export function Tooltip({ text, secondaryText, linkLabel, linkHref }: TooltipProps) {
  return (
    <div role="tooltip" className={styles.tooltip}>
      <span className={styles.text}>{text}</span>
      {secondaryText && <span className={styles.text}>{secondaryText}</span>}
      {linkLabel && linkHref && (
        <a href={linkHref} className={styles.link}>{linkLabel}</a>
      )}
    </div>
  );
}
