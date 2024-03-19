import MyButton from "./controls/Button";
import { SipProvider } from "react-sip";

export default function SOSButton() {
    return (
        <SipProvider
            host="192.168.0.51"
            port={8089}
            pathname="/asterisk/ws" // Path in socket URI (e.g. wss://sip.example.com:7443/ws); "" by default
            user="103"
            password="NnBJeGFVUU5KSU09" // usually required (e.g. from ENV or props)
            autoRegister={true} // true by default, see jssip.UA option register
            autoAnswer={false} // automatically answer incoming calls; false by default
            iceRestart={false} // force ICE session to restart on every WebRTC call; false by default
            sessionTimersExpires={120} // value for Session-Expires header; 120 by default
            /* extraHeaders={
             *     {
             *         // optional sip headers to send
             *         register: ["X-Foo: foo", "X-Bar: bar"],
             *         invite: ["X-Foo: foo2", "X-Bar: bar2"],
             *     }
             * } */
            /* iceServers={[
             *     // optional
             *     { urls: ["stun:a.example.com", "stun:b.example.com"] },
             *     {
             *         urls: "turn:example.com",
             *         username: "foo",
             *         credential: "1234",
             *     },
             * ]} */
            debug={false} // whether to output events to console; false by default
        >
            <MyButton
                text={"SOS"}
                button_type={"ButtonRed"}
                hook={() => {
                    SipProvider.prototype.getChildContext().startCall("103");
                }}
            />
        </SipProvider>
    );
}
