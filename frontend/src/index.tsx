import React from "react";
import App from "./pages/App";
import "./index.scss";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
