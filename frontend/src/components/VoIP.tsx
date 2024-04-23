import { useEffect, useState } from "react";
import Hiding from "./Hiding";
import MyButton from "./controls/Button";
import * as JsSIP from "jssip";
import { Box, CircularProgress, LinearProgress, Button } from "@mui/material";
import "./VoIP.scss";
import axios from "axios";

const callStatusHumanMap = {
    unset: "Звонок не начат",
    progress: "Звоним...",
    established: "Говорите!",
    ended: "Звонок завершен",
};

function call({
    station_ip,
    station_port,
    endpoint,
    password,
    setCallStatus,
    setIsShown,
}) {
    let socket = new JsSIP.WebSocketInterface(
        `wss://${station_ip}:${station_port}/asterisk/ws`,
    );

    let configuration = {
        sockets: [socket],
        uri: `sip:${endpoint}@${station_ip}`,
        password: password,
    };

    let ua = new JsSIP.UA(configuration);

    ua.start();

    let eventHandlers = {
        progress: function (e) {
            console.log("call is in progress");
            setCallStatus("progress");
        },
        failed: function (e) {
            console.log("call failed with cause:", e.cause);
            ua.terminateSessions();
            ua.stop();
            socket.disconnect();
            setCallStatus("unset");
            // setIsShown(false);
        },
        ended: function (e) {
            console.log("call ended with cause:", e.cause);
            ua.terminateSessions();
            ua.stop();
            socket.disconnect();
            setCallStatus("unset");
            // setIsShown(false);
        },
        confirmed: function (e) {
            console.log("call confirmed");
            setCallStatus("established");
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

function CallCard({ isShown, setIsShown, callContext, callStatus }) {
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
                                <Box sx={{ width: 180 }}>
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

async function getHubLocalIP() {
    if (!RTCPeerConnection) {
        throw new Error("Not supported.");
    }

    const peerConnection = new RTCPeerConnection({ iceServers: [] });

    peerConnection.createDataChannel("");
    peerConnection.createOffer(
        peerConnection.setLocalDescription.bind(peerConnection),
        () => {},
    );

    peerConnection.addEventListener("icecandidateerror", (event) => {
        throw new Error(event.errorText);
    });

    return new Promise(async (resolve) => {
        peerConnection.addEventListener(
            "icecandidate",
            async ({ candidate }) => {
                peerConnection.close();

                if (candidate && candidate.candidate) {
                    const result = candidate.candidate.split(" ")[4];
                    if (result.endsWith(".local")) {
                        const inputDevices =
                            await navigator.mediaDevices.enumerateDevices();
                        const inputDeviceTypes = inputDevices.map(
                            ({ kind }) => kind,
                        );

                        const constraints = {};

                        if (inputDeviceTypes.includes("audioinput")) {
                            constraints.audio = true;
                        } else if (inputDeviceTypes.includes("videoinput")) {
                            constraints.video = true;
                        } else {
                            throw new Error(
                                "An audio or video input device is required!",
                            );
                        }

                        const mediaStream =
                            await navigator.mediaDevices.getUserMedia(
                                constraints,
                            );
                        mediaStream
                            .getTracks()
                            .forEach((track) => track.stop());
                        resolve(getHubLocalIP());
                    }
                    resolve(result);
                }
            },
        );
    });
}

function captureWebcam() {
    getHubLocalIP().then((ip) => {
        axios.get(`https://${ip}:5050/capture`).catch((e) => {
            console.log("Failed to capture webcam: ", e);
        });
    });
}

export default function SOSButton() {
    const [isShown, setIsShown] = useState(false);
    const [callContext, setCallContext] = useState(null);
    const [callStatus, setCallStatus] = useState("unset");

    const station_ip = import.meta.env.VITE_PBX_STATION_IP;
    const station_port = import.meta.env.VITE_PBX_STATION_PORT;
    const endpoint = import.meta.env.VITE_PBX_ENDPOINT;
    const password = import.meta.env.VITE_PBX_PASSWORD;

    return (
        <div>
            <CallCard
                isShown={isShown}
                setIsShown={setIsShown}
                callContext={callContext}
                callStatus={callStatus}
            />
            <MyButton
                 style={{
                    left: "-5cm",
                    top: "12cm",
                }}
                text={"SOS"}
                button_type={"ButtonRed"}
                hook={() => {
                    captureWebcam();
                    setIsShown(true);
                    setCallContext(
                        call({
                            station_ip,
                            station_port,
                            endpoint,
                            password,
                            setCallStatus,
                            setIsShown,
                        }),
                    );
                }}
            />
        </div>
    );
}
