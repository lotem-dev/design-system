import styles from "./Tooltip.module.css";

type TooltipProps = {
  text: string;
  secondaryText?: string;
  linkLabel?: string;
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
