import "./Pin.scss";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Text } from "react-native-web";
import ReactNativePinView from "./PinView.jsx";
import { useTimer } from "react-timer-hook";
import { useLocation } from "react-router-dom";
import { BACKADDR } from "../const";

// Receives lockedView property which is a component to be shown when correct
// pin is entered
export default function Pin({ lockedView, locked, setLocked }) {
    const location = useLocation();
    const [correctCode, setCorrectCode] = useState("1");
    const attemptsToBlock = 3;
    const blockForSeconds = 59;
    const unlockForSeconds = 60000000;

    const pinView = useRef(null);
    const [enteredPin, setEnteredPin] = useState("");
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [blocked, setBlocked] = useState(false);

    const passwordSync = async () => {
        try {
            const response = await axios.get(`${BACKADDR}/get_password`, {
                params: {},
            });
            // console.log(response.data.password)
            setCorrectCode(response.data.password);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    setTimeout(passwordSync, 1000);
    useEffect(() => {
        passwordSync();
    }, []);

    const blockExpiryTimestamp = new Date();
    blockExpiryTimestamp.setSeconds(
        blockExpiryTimestamp.getSeconds() + blockForSeconds,
    );

    const blockTimer = useTimer({
        blockExpiryTimestamp,
        autoStart: false,
        onExpire: () => setBlocked(false),
    });

    const lockExpiryTimestamp = new Date();
    lockExpiryTimestamp.setSeconds(
        lockExpiryTimestamp.getSeconds() + unlockForSeconds,
    );

    const lockTimer = useTimer({
        lockExpiryTimestamp,
        autoStart: false,
        onExpire: () => setLocked(true),
    });

    useEffect(() => {
        if (enteredPin.length === correctCode.length) {
            if (enteredPin === correctCode) {
                setLocked(false);
            } else {
                pinView.current.clearAll();
                setFailedAttempts(failedAttempts + 1);
                if (failedAttempts + 1 >= attemptsToBlock) {
                    blockTimer.restart(blockExpiryTimestamp, true);
                    setFailedAttempts(0);
                    setBlocked(true);
                }
            }
        }
    }, [enteredPin]);

    const [pathSkipped, setPathSkipped] = useState(false);

    useEffect(() => {
        if (location.pathname == "/statistics") {
            setLocked(false);
            setPathSkipped(true);
            return;
        }
        setLocked(true);
        setPathSkipped(false);
        lockTimer.restart(lockExpiryTimestamp, false);
    }, [location]);

    useEffect(() => {
        if (!locked && !pathSkipped) {
            setBlocked(false);
            setFailedAttempts(0);
            lockTimer.restart(lockExpiryTimestamp, true);
        }
    }, [locked]);

    return (
        <div
            style={
                locked
                    ? {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                      }
                    : {}
            }
        >
            {locked ? (
                <ReactNativePinView
                    style={{
                        padding: "0.2cm",
                        width: "10cm",
                        height: "13cm",
                        marginLeft: "3cm",
                        marginRight: "1cm",
                        marginTop: "0.3cm",
                        userSelect: "none",
                        WebkitTapHighlightColor: "transparent",
                        opacity: blocked ? 0.5 : 1.0,
                        pointerEvents: blocked ? "none" : "auto",
                        backgroundColor: "rgba(127, 127, 127, 0.15)",
                        borderRadius: 20,
                    }}
                    inputSize={30}
                    ref={pinView}
                    pinLength={correctCode.length}
                    buttonSize={90}
                    onValueChange={(value) => setEnteredPin(value)}
                    inputViewEmptyStyle={{
                        backgroundColor: "transparent",
                        borderWidth: 1,
                        borderColor: "#000",
                    }}
                    inputViewFilledStyle={{
                        backgroundColor: "#000",
                    }}
                    buttonViewStyle={{
                        borderWidth: 1,
                        borderColor: "#000",
                    }}
                    buttonTextStyle={{
                        color: "#000",
                        fontSize: "28pt",
                    }}
                    onButtonPress={(key) => {
                        if (key === "custom_left") {
                            pinView.current.clearAll();
                        }
                        if (key === "custom_right") {
                            pinView.current.clear();
                        }
                    }}
                    customLeftButton=<Text
                        style={{ color: "#000", fontSize: 36 }}
                    >
                        {blockTimer.isRunning ? blockTimer.seconds : "↻"}
                    </Text>
                    customRightButton=<Text
                        style={{ color: "#000", fontSize: 36 }}
                    >
                        ⇐
                    </Text>
                />
            ) : (
                lockedView
            )}
        </div>
    );
}
