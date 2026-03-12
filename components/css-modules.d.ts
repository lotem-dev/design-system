// Tells TypeScript that *.module.css files export a plain object of class name strings.
declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}
