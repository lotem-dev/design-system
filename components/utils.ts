/** Joins class names, filtering out falsy values. */
export function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(" ");
}
