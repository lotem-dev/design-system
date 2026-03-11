import { createRoot } from "react-dom/client";
import "../styles/globals.css";
import { CatalogApp } from "./catalog/CatalogApp";

const root = createRoot(document.getElementById("root")!);
root.render(<CatalogApp />);
