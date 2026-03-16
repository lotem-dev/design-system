// parseProps.ts
// Reads a raw TypeScript component file and extracts prop names, types,
// and the designer-friendly // comments that sit directly above each prop.
// This is what powers the auto-generated Props tables in the catalog —
// so that when a prop changes in the component file, the docs update automatically.

export type PropDef = {
  name: string;
  type: string;
  description: string;
  required: boolean;
};

export function parseProps(rawSource: string): PropDef[] {
  const props: PropDef[] = [];
  const seen = new Set<string>();
  const lines = rawSource.split("\n");

  let insidePropsBlock = false;
  let depth = 0;
  let pendingComment = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Detect start of any "*Props" type block (BaseProps, ButtonProps, etc.)
    if (/^(export\s+)?type\s+\w*[Pp]rops\w*\s*=\s*\{/.test(trimmed)) {
      insidePropsBlock = true;
      depth = 1;
      pendingComment = "";
      continue;
    }

    if (!insidePropsBlock) continue;

    // Track brace depth so we stay inside the type block
    const opens  = (trimmed.match(/\{/g) ?? []).length;
    const closes = (trimmed.match(/\}/g) ?? []).length;
    depth += opens - closes;

    if (depth <= 0) {
      insidePropsBlock = false;
      pendingComment = "";
      continue;
    }

    // Only capture top-level props (depth === 1), not nested object types
    if (depth !== 1) {
      pendingComment = "";
      continue;
    }

    // Accumulate comment lines that sit directly above a prop
    if (trimmed.startsWith("//")) {
      const commentText = trimmed.replace(/^\/\/\s*/, "");
      // Append in case a prop has multiple comment lines
      pendingComment = pendingComment ? pendingComment + " " + commentText : commentText;
      continue;
    }

    // Match a prop definition: propName?: Type; or propName: Type;
    const propMatch = trimmed.match(/^(\w+)(\?)?\s*:\s*(.+?)(?:;|\s*$)/);
    if (propMatch) {
      const [, name, optional, rawType] = propMatch;
      const type = rawType.trim().replace(/;$/, "").trim();

      if (!seen.has(name)) {
        seen.add(name);
        props.push({ name, type, description: pendingComment, required: !optional });
      }
    }

    // Any non-comment, non-empty line resets the pending comment
    if (trimmed !== "" && !trimmed.startsWith("//")) {
      pendingComment = "";
    }
  }

  return props;
}
