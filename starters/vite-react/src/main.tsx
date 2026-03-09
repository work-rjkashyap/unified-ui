import { DSThemeProvider } from "@work-rjkashyap/unified-ui/theme";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DSThemeProvider manageHtmlClass>
      <App />
    </DSThemeProvider>
  </StrictMode>,
);
