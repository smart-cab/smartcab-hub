import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import AppLayout from "./AppLayout";
import ControlPage from "./ControlPage";
import { Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [connectionStatus, setConnectionStatus] = useState(true);
    const checkConnectionStatusMs = 5000;

    useEffect(() => {
        const checkConnectionStatusInterval = setInterval(() => {
            setConnectionStatus(true);
            axios.get("/status").catch((_) => setConnectionStatus(false));
            axios.get("/frontend_status").catch((error) => {
                if (!error.response) setConnectionStatus(false);
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
                        <Route path="/pin" element=<div /> />
                        <Route path="/frontend_status" element=<div /> />
                    </Route>
                </Routes>
            </BrowserRouter>
            <Snackbar
                open={connectionStatus != "ok"}
                autoHideDuration={1000}
                anchorOrigin={{
                    vertical: "down",
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

export default App;
