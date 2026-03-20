// parseProps.ts
// Reads a raw TypeScript component file and extracts prop names, types,
// required flag, default values, and the designer-friendly // comments
// that sit directly above each prop.
// This is what powers the auto-generated Props tables in the catalog —
// so that when a prop changes in the component file, the docs update automatically.

export type PropDef = {
  name: string;
  type: string;
  description: string;
  required: boolean;
  defaultValue?: string;
};

export function parseProps(rawSource: string): PropDef[] {
  const defaults = extractDefaults(rawSource);

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
        props.push({
          name,
          type,
          description: pendingComment,
          required: !optional,
          defaultValue: defaults[name],
        });
      }
    }

    // Any non-comment, non-empty line resets the pending comment
    if (trimmed !== "" && !trimmed.startsWith("//")) {
      pendingComment = "";
    }
  }

  return props;
}

// ─── Extract defaults from function destructuring ─────────────────────────────
// Handles both single-line:  function Foo({ a = 1, b }: Props)
// and multi-line:            function Foo({
//                              a = 1,
//                            }: Props)

function extractDefaults(rawSource: string): Record<string, string> {
  const defaults: Record<string, string> = {};
  const lines = rawSource.split("\n");

  let collecting = false;
  const paramLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (!collecting) {
      // Single-line destructuring: function Name({ a = 1, b }: Type)
      const single = trimmed.match(/^(?:export\s+)?function\s+\w+\s*\(\s*\{(.+?)\}\s*:/);
      if (single) {
        extractFromString(single[1], defaults);
        continue;
      }
      // Multi-line start: function Name({
      if (/^(?:export\s+)?function\s+\w+\s*\(\s*\{/.test(trimmed)) {
        collecting = true;
        paramLines.length = 0;
      }
    } else {
      // End of destructuring block
      if (/^\}\s*:/.test(trimmed)) {
        collecting = false;
        extractFromString(paramLines.join(", "), defaults);
      } else {
        paramLines.push(trimmed);
      }
    }
  }

  return defaults;
}

function extractFromString(str: string, out: Record<string, string>) {
  // Match: propName = "value" | 'value' | true | false | number
  const re = /(\w+)\s*=\s*("[^"]*"|'[^']*'|true|false|null|undefined|-?\d[\d.]*)/g;
  let m;
  while ((m = re.exec(str)) !== null) {
    out[m[1]] = m[2];
  }
}
