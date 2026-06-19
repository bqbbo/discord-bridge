import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import StatusProvider from "./contexts/StatusProvider";
import App from "./App";

createRoot(document.getElementById("root") as HTMLElement).render(
    <StatusProvider>
        <StrictMode>
            <App />
        </StrictMode>
    </StatusProvider>,
);
