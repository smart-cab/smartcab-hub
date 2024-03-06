import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import AppLayout from "./AppLayout";
import ControlPage from "./ControlPage";
import { Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Statistics from "../components/Statstics";

export default function App() {
    const [connectionStatus, setConnectionStatus] = useState("ok");
    const checkConnectionStatusMs = 500;

    useEffect(() => {
        const checkConnectionStatusInterval = setInterval(() => {
            setConnectionStatus("ok");
            axios
                .get("http://localhost:5000/status")
                .then((r) => console.log(r))
                .catch((_) => setConnectionStatus("backend_down"));
            axios.get("/frontend_status").catch((error) => {
                if (!error.response) setConnectionStatus("frontend_down");
            });
        }, checkConnectionStatusMs);
        return () => clearInterval(checkConnectionStatusInterval);
    }, []);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AppLayout />}>
                        <Route path="/" element=<ControlPage /> />
                        <Route path="/frontend_status" element=<div /> />
                        <Route path="/statistics" element=<Statistics /> />
                        <Route path="/conference" element=<div /> />
                    </Route>
                </Routes>
            </BrowserRouter>
            <Snackbar
                open={connectionStatus != "ok"}
                autoHideDuration={500}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                style={{ top: "80%" }}
            >
                <Alert
                    severity="error"
                    action=<div />
                    style={{ borderRadius: "30px" }}
                >
                    Ошибка подключения к серверу
                </Alert>
            </Snackbar>
        </>
    );
}
