import { useEffect, useState } from "react";
import Hiding from "./Hiding";
import MyButton from "./controls/Button";
import * as JsSIP from "jssip";
import { Box, CircularProgress, LinearProgress, Button } from "@mui/material";
import "./VoIP.scss";

function call(endpoint: string) {
    let socket = new JsSIP.WebSocketInterface(
        "wss://192.168.0.51:8089/asterisk/ws",
    );

    let configuration = {
        sockets: [socket],
        uri: "sip:103@192.168.0.51",
        password: "NnBJeGFVUU5KSU09",
    };

    let ua = new JsSIP.UA(configuration);

    ua.start();

    let eventHandlers = {
        progress: function (e) {
            console.log("call is in progress");
        },
        failed: function (e) {
            console.log("call failed with cause: " + e.data.cause);
        },
        ended: function (e) {
            console.log("call ended with cause: " + e.data.cause);
        },
        confirmed: function (e) {
            console.log("call confirmed");
        },
    };

    let options = {
        eventHandlers: eventHandlers,
        mediaConstraints: { audio: true, video: false },
    };

    let session = ua.call(endpoint, options);

    return session;
}

function CallCard({ isShown, setIsShown, session }) {
    const callStatusHumanMap = {
        unset: "Звонок не начат",
        progress: "Звоним...",
        established: "Говорите!",
        ended: "Звонок завершен",
    };
    const [callStatus, setCallStatus] = useState("unset"); // unset | progress | established | ended

    useEffect(() => {
        if (session == null) {
            setCallStatus("unset");
        } else {
            if (session.isInProgress()) {
                setCallStatus("progress");
            } else if (session.isEstablished()) {
                setCallStatus("established");
            } else if (session.isEnded()) {
                setCallStatus("ended");
                setIsShown(false);
            }
        }
    }, [session]);

    return (
        isShown && (
            <div>
                <Hiding layout="all" />

                <div className="card">
                    <div className="card-content">
                        <h1 className="callStatus">
                            {callStatusHumanMap[callStatus]}
                        </h1>
                        <div className="progress">
                            {callStatus == "progress" && <CircularProgress />}
                            {callStatus == "established" && (
                                <Box sx={{ width: "100%" }}>
                                    <LinearProgress />
                                </Box>
                            )}
                        </div>
                        <div className="controllers">
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setIsShown(false);
                                    if (session != null) {
                                        session.terminate();
                                    }
                                }}
                            >
                                Завершить звонок
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default function SOSButton() {
    const [isShown, setIsShown] = useState(false);
    const [session, setSession] = useState(null);
    return (
        <>
            <CallCard
                isShown={isShown}
                setIsShown={setIsShown}
                session={session}
            />
            <MyButton
                text={"SOS"}
                button_type={"ButtonRed"}
                hook={() => {
                    setIsShown(true);
                    setSession(call("100"));
                }}
            />
        </>
    );
}
