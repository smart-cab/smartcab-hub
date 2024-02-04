import "./Pin.scss";
import React, { useEffect, useRef, useState } from "react";
import { Text } from "react-native";
import ReactNativePinView from "./PinView.jsx";

// Receives lockedView property which is a component to be shown when correct
// pin is entered
export default function Pin(props) {
    const correctCode = "1234";
    const pinView = useRef(null);
    const [enteredPin, setEnteredPin] = useState("");
    const [locked, setLocked] = useState(true);

    useEffect(() => {
        if (enteredPin === correctCode) {
            setLocked(false);
        } else if (
            enteredPin.length === correctCode.length &&
            enteredPin != correctCode
        ) {
            pinView.current.clearAll();
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
                props.lockedView
            )}
        </>
    );
}
