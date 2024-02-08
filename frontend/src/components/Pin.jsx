import "./Pin.scss";
import React, { useEffect, useRef, useState } from "react";
import { Text } from "react-native";
import ReactNativePinView from "./PinView.jsx";
import { useTimer } from "react-timer-hook";

// Receives lockedView property which is a component to be shown when correct
// pin is entered
export default function Pin({ lockedView }) {
    const correctCode = "1234";
    const attemptsToBlock = 3;
    const blockForSeconds = 10;

    const pinView = useRef(null);
    const [enteredPin, setEnteredPin] = useState("");
    const [locked, setLocked] = useState(true);
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [blocked, setBlocked] = useState(false);

    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + blockForSeconds);

    const blockTimer = useTimer({
        expiryTimestamp,
        autoStart: false,
        onExpire: () => setBlocked(false),
    });

    useEffect(() => {
        if (enteredPin.length === correctCode.length) {
            if (enteredPin === correctCode) {
                setLocked(false);
                setBlocked(false);
                setFailedAttempts(0);
            } else {
                pinView.current.clearAll();
                setFailedAttempts(failedAttempts + 1);
                if (failedAttempts + 1 >= attemptsToBlock) {
                    blockTimer.restart(expiryTimestamp, true);
                    setFailedAttempts(0);
                    setBlocked(true);
                }
            }
        }
    }, [enteredPin]);

    return (
        <>
            {locked ? (
                <ReactNativePinView
                    style={{
                        padding: 36,
                        width: "50%",
                        marginLeft: "3cm",
                        marginRight: "1cm",
                        userSelect: "none",
                        WebkitTapHighlightColor: "transparent",
                        opacity: blocked ? 0.5 : 1.0,
                        pointerEvents: blocked ? "none" : "auto",
                    }}
                    inputSize={32}
                    ref={pinView}
                    pinLength={correctCode.length}
                    buttonSize={100}
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
                        ↻
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
        </>
    );
}
