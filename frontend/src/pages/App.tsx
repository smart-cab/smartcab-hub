import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import AppLayout from "./AppLayout";
import ControlPage from "./ControlPage";
import { Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { BACKADDR } from "../const";
import axios from "axios";
import Statistics from "../components/Statstics";
import ConferenceManager from "../components/ConferenceManager";
import Pin from "../components/Pin";

export default function App() {
    const [connectionStatus, setConnectionStatus] = useState("ok");
    const checkConnectionStatusMs = 500;

    useEffect(() => {
        const checkConnectionStatusInterval = setInterval(() => {
            setConnectionStatus("ok");
            axios.get(`${BACKADDR}/status`);
            // .then((_) => console.log(""))
            // .catch((_) => setConnectionStatus("backend_down"));
            axios.get("/frontend_status").catch((error) => {
                if (!error.response) setConnectionStatus("frontend_down");
            });
        }, checkConnectionStatusMs);
        return () => clearInterval(checkConnectionStatusInterval);
    }, []);

    const [pinLocked, setPinLocked] = useState(true);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <AppLayout
                                pinLocked={pinLocked}
                                setPinLocked={setPinLocked}
                            />
                        }
                    >
                        <Route
                            path="/"
                            element=<Pin
                                locked={pinLocked}
                                setLocked={setPinLocked}
                                lockedView=<ControlPage />
                            />
                        />
                        <Route path="/statistics" element=<Statistics /> />
                        <Route
                            path="/conference"
                            element=<Pin
                                locked={pinLocked}
                                setLocked={setPinLocked}
                                lockedView=<ConferenceManager />
                            />
                        />

                        <Route path="/frontend_status" element=<div /> />
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
