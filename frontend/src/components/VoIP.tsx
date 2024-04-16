import { useEffect, useState } from "react";
import Hiding from "./Hiding";
import MyButton from "./controls/Button";
import * as JsSIP from "jssip";
import { Box, CircularProgress, LinearProgress, Button } from "@mui/material";
import "./VoIP.scss";

function call(ip: string, endpoint: string, password: string) {
    let socket = new JsSIP.WebSocketInterface(`wss://${ip}:8089/asterisk/ws`);

    let configuration = {
        sockets: [socket],
        uri: `sip:${endpoint}@${ip}`,
        password: password,
    };

    let ua = new JsSIP.UA(configuration);

    ua.start();

    let eventHandlers = {
        progress: function (e) {
            console.log("call is in progress");
        },
        failed: function (e) {
            console.log("call failed with cause: " + e.data.cause);
            ua.terminateSessions();
            ua.stop();
            socket.disconnect();
        },
        ended: function (e) {
            console.log("call ended with cause: " + e.data.cause);
            ua.terminateSessions();
            ua.stop();
            socket.disconnect();
        },
        confirmed: function (e) {
            console.log("call confirmed");
        },
        addstream: (e) => {
            console.log("Add stream (event handlers)");
            audio.srcObject = e.stream;
            audio.play();
        },
    };

    const audio = new window.Audio();

    let options = {
        eventHandlers: eventHandlers,
        mediaConstraints: { audio: true, video: false },
    };

    let session = ua.call(endpoint, options);

    if (session.connection) {
        console.log("Connection is valid");

        session.connection.addEventListener("addstream", (e) => {
            console.log("Add stream");
            audio.srcObject = e.stream;
            audio.play();
        });

        session.on("addstream", function (e) {
            // set remote audio stream (to listen to remote audio)
            // remoteAudio is <audio> element on page
            const remoteAudio = audio;
            remoteAudio.src = window.URL.createObjectURL(e.stream);
            remoteAudio.play();
        });
        session.connection.addEventListener("peerconnection", (e) => {
            console.log("Peer connection");
            audio.srcObject = e.stream;
            audio.play();
        });
    } else {
        console.log("Connection is null");
    }

    ua.on("newRTCSession", (data) => {
        console.log("New RTC Session");
        const session = data.session;
        session.on("addstream", function (e) {
            // set remote audio stream (to listen to remote audio)
            // remoteAudio is <audio> element on page
            const remoteAudio = audio;
            remoteAudio.src = window.URL.createObjectURL(e.stream);
            remoteAudio.play();
        });
    });

    return { session: session, ua: ua, socket: socket };
}

function CallCard({ isShown, setIsShown, callContext }) {
    if (callContext == null) {
        return <></>;
    }

    const callStatusHumanMap = {
        unset: "Звонок не начат",
        progress: "Звоним...",
        established: "Говорите!",
        ended: "Звонок завершен",
    };
    const [callStatus, setCallStatus] = useState("unset"); // unset | progress | established | ended

    useEffect(() => {
        if (callContext == null) {
            setCallStatus("unset");
        } else {
            if (callContext.session.isInProgress()) {
                setCallStatus("progress");
            } else if (callContext.session.isEstablished()) {
                setCallStatus("established");
            } else if (callContext.session.isEnded()) {
                setCallStatus("ended");
                setIsShown(false);
            }
        }
    });

    return (
        isShown && (
            <div>
                <Hiding layout="all" />

                <div className="voip-card">
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
                                    if (callContext != null) {
                                        callContext.ua.terminateSessions();
                                        callContext.ua.stop();
                                        callContext.socket.disconnect();
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
    const [callContext, setCallContext] = useState(null);

    const ip = "192.168.1.97";
    const endpoint = "100";
    const password = "LzJxci8yWnV4Z1k9";

    return (
        <>
            <CallCard
                isShown={isShown}
                setIsShown={setIsShown}
                callContext={callContext}
            />
            <MyButton
                text={"SOS"}
                button_type={"ButtonRed"}
                hook={() => {
                    setIsShown(true);
                    setCallContext(call(ip, endpoint, password));
                }}
            />
        </>
    );
}
