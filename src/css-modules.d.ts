// Tells TypeScript that *.module.css files export a plain object of class name strings.
// Vite handles the actual transformation at runtime; this just satisfies the type checker.
declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}
