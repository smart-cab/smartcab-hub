import { useState } from "react";
import Hiding from "./Hiding";
import MyButton from "./controls/Button";
import * as JsSIP from "jssip";
import "./VoIP.scss";

function call() {
    // Create our JsSIP instance and run it:
    var socket = new JsSIP.WebSocketInterface(
        "wss://192.168.0.51:8089/asterisk/ws",
    );
    var configuration = {
        sockets: [socket],
        uri: "sip:103@192.168.0.51",
        password: "NnBJeGFVUU5KSU09",
    };

    var ua = new JsSIP.UA(configuration);

    ua.start();

    // Register callbacks to desired call events
    var eventHandlers = {
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

    var options = {
        eventHandlers: eventHandlers,
        mediaConstraints: { audio: true, video: false },
    };

    var session = ua.call("100", options);
    console.log("YAY!");
}

function CallCard({ isShown, setIsShown }) {
    const CloseHiding = () => {
        setIsShown(false);
    };

    return (
        <div>
            {isShown && (
                <div>
                    <Hiding layout="all" />

                    <button className="CloseHiding" onClick={CloseHiding}>
                        <img width="45px" src="close2.png" alt="close2" />
                    </button>

                    <div className="card">Test</div>
                </div>
            )}
        </div>
    );
}

export default function SOSButton() {
    const [isShown, setIsShown] = useState(false);
    //
    return (
        <>
            <CallCard isShown={isShown} setIsShown={setIsShown} />
            <MyButton
                text={"SOS"}
                button_type={"ButtonRed"}
                hook={() => setIsShown(true)}
            />
        </>
    );
}
