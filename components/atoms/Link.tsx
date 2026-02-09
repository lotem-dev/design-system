import * as React from "react";

// Strict Link props:
// - href: required
// - children: required (usually a <Text role="...">...</Text>)
// - colorToken: optional design token for text color (the text inherits it)
// - external: optional; if true, opens in a new tab safely
type LinkProps = {
  href: string;
  children: React.ReactNode;

  // We allow color control, but only as a token string.
  // Example: "var(--brand-primary)" or "var(--text-primary)"
  colorToken?: string;

  // If true:
  // - opens in a new browser tab
  // - adds rel="noopener noreferrer" for security
  external?: boolean;
};

export function Link({ href, children, colorToken, external }: LinkProps) {
  return (
    <a
      href={href}
      // When external is true, open in a new tab.
      target={external ? "_blank" : undefined}
      // Security best practice for target="_blank".
      rel={external ? "noopener noreferrer" : undefined}
      // Link controls interaction + semantics.
      // Color is set here so the text inside inherits it.
      style={{
        color: colorToken,
        textDecoration: "none",
      }}
      // Hover underline (mouse users)
      onMouseEnter={(e) => {
        e.currentTarget.style.textDecoration = "underline";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.textDecoration = "none";
      }}
      // Focus underline (keyboard users)
      onFocus={(e) => {
        e.currentTarget.style.textDecoration = "underline";
      }}
      onBlur={(e) => {
        e.currentTarget.style.textDecoration = "none";
      }}
    >
      {children}
    </a>
  );
}
