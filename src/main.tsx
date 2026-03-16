import { createRoot } from "react-dom/client";
import "../styles/globals.css";
import "highlight.js/styles/atom-one-light.css";
import { CatalogApp } from "./catalog/CatalogApp";

const root = createRoot(document.getElementById("root")!);
root.render(<CatalogApp />);
