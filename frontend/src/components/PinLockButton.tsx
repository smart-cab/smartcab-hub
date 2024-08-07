import { Pressable } from "react-native-web";
import IconButton from "@mui/material/IconButton";
import React from "react";

export default function PinLockButton({
    pinLocked,
    setPinLocked,
}: {
    pinLocked: boolean;
    setPinLocked: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <Pressable
            style={{
                fontSize: 36,
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
            {pinLocked ? (
                <IconButton
                    aria-label="fingerprint"
                    color="secondary"
                    style={{ width: "60px", height: "60px", color: "#6cbed8", bottom: "0.2cm" }}
                >
                    <img width="40px" src="/lock_close.png" />
                </IconButton>
            ) : (
                <IconButton
                    aria-label="fingerprint"
                    color="secondary"
                    style={{ width: "60px", height: "60px", color: "#6cbed8", bottom: "0.2cm"}}
                >
                    <img width="40px" src="/lock_open.png" />
                </IconButton>
            )}
        </Pressable>
    );
}
