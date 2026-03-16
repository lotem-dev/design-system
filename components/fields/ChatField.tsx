// ChatField — the AI chat input component at the bottom of the Jit assistant panel.
// It includes a growing text area, a toolbar with attach and options buttons, a send button,
// and a connectors strip below that shows which integrations are active.
// Used on the AI assistant screen as the primary way for users to ask security questions.
import * as React from "react";
import { useRef } from "react";
import { IconSend }         from "../icons/usecases/IconSend";
import { IconInformation }  from "../icons/usecases/IconInformation";
import { IconChevronRight } from "../icons/chevrons/IconChevronRight";
import styles from "./ChatField.module.css";

// ─── Local toolbar icons ───────────────────────────────────

function IconPaperclip(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16.5 9L9.5 16a5 5 0 01-7.07-7.07l8-8a3 3 0 014.24 4.24L6.6 13.2a1 1 0 01-1.41-1.41L12 5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSliders(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <line x1="3" y1="5"  x2="17" y2="5"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7"  cy="5"  r="2" fill="var(--surface-primary)" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13" cy="10" r="2" fill="var(--surface-primary)" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9"  cy="15" r="2" fill="var(--surface-primary)" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────

// A logo SVG component — used to pass brand logos into the connectors strip.
export type ConnectorLogo = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export type ChatFieldProps = {
  // The current text typed into the field.
  value: string;
  // Called every time the user types — receives the updated text.
  onChange: (value: string) => void;
  // Called when the user clicks Send or presses Enter.
  onSend: () => void;
  // Called when the user clicks the attach (paperclip) button.
  onAttach?: () => void;
  // Called when the user clicks the options (sliders) button.
  onOptions?: () => void;
  // Logo components to show in the connectors strip — only up to 4 are displayed.
  connectors?: ConnectorLogo[];
  // Total number of connected integrations — used to show the count label; falls back to the logos array length.
  connectorCount?: number;
  // Called when the user clicks the connectors strip to manage integrations.
  onConnectorsClick?: () => void;
  // Placeholder text shown when the field is empty.
  placeholder?: string;
  // When true, the send button shows a loading spinner instead of the send icon.
  isProcessing?: boolean;
};

// Only up to 4 connector logos are shown; the rest are counted as overflow.
const MAX_VISIBLE = 4;

// ─── Component ────────────────────────────────────────────

export function ChatField({
  value,
  onChange,
  onSend,
  onAttach,
  onOptions,
  connectors = [],
  connectorCount,
  onConnectorsClick,
  placeholder = "Ask anything about your company's security...",
  isProcessing = false,
}: ChatFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // True only when there is actual text in the field (ignoring whitespace).
  const hasText     = value.trim().length > 0;
  // Use the explicit count if provided, otherwise count the logos array.
  const totalCount  = connectorCount ?? connectors.length;
  // The logos to render — capped at MAX_VISIBLE.
  const visible     = connectors.slice(0, MAX_VISIBLE);
  // How many connectors are not shown as logos — displayed as "+N".
  const overflow    = totalCount - visible.length;

  // Auto-grow the textarea to fit its content
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && hasText && !isProcessing) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div className={styles.root}>

      {/* ── Main input card ─────────────────────────────── */}
      <div className={styles.card}>

        <div className={styles.textRow}>
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
          />
        </div>

        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <button className={styles.toolbarBtn} onClick={onAttach} type="button" aria-label="Attach file">
              <IconPaperclip width={20} height={20} />
            </button>
            <button className={styles.toolbarBtn} onClick={onOptions} type="button" aria-label="Chat options">
              <IconSliders width={20} height={20} />
            </button>
          </div>

          <button
            className={`${styles.sendBtn} ${hasText && !isProcessing ? styles.sendActive : styles.sendIdle}`}
            onClick={() => hasText && !isProcessing && onSend()}
            type="button"
            aria-label="Send"
          >
            {isProcessing
              ? <span className={styles.spinner} />
              : <IconSend width={20} height={20} />
            }
          </button>
        </div>

      </div>

      {/* ── Connectors strip ────────────────────────────── */}
      <div className={styles.stripOuter}>
        <div className={styles.strip}>

          <div className={styles.stripLeft}>
            <span className={styles.stripLabel}>Connectors</span>
            {totalCount > 0 && <span className={styles.stripCount}>({totalCount})</span>}
            <IconInformation width={12} height={12} className={styles.infoIcon} />
          </div>

          <button className={styles.stripRight} onClick={onConnectorsClick} type="button" aria-label="View connectors">
            {visible.length > 0 && (
              <div className={styles.avatarRow}>
                {visible.map((Logo, i) => (
                  <div key={i} className={styles.avatar}>
                    <Logo width={15} height={15} />
                  </div>
                ))}
                {overflow > 0 && (
                  <span className={styles.overflow}>+{overflow}</span>
                )}
              </div>
            )}
            <IconChevronRight width={20} height={20} className={styles.chevron} />
          </button>

        </div>
      </div>

    </div>
  );
}
