import { Pressable } from "react-native";

export default function PinLockButton({ pinLocked, setPinLocked }) {
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
            <span>{pinLocked ? "🔒" : "🔓"}</span>
        </Pressable>
    );
}
