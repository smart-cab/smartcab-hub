import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";

export default function PinLockButton({ pinLocked, setPinLocked }) {
    const [icon, setIcon] = useState("🔒");

    useEffect(() => {
        console.log(pinLocked);
        if (pinLocked) {
            setIcon("🔒");
        } else {
            setIcon("🔓");
        }
    }, [pinLocked]);

    return (
        <Pressable
            style={{
                fontSize: 24,
                width: "1cm",
                height: "1cm",
                outline: "inherit",
            }}
            onPress={() => {
                if (!pinLocked) {
                    setPinLocked(true);
                }
            }}
        >
            <span>{icon}</span>
        </Pressable>
    );
}
