import { useState, useEffect } from "react";
import axios from "axios";
import UPDATE_INTERVAL from "../config";
import "./Sensor.scss";

export default function Pressure() {
    const [pressure, setPressure] = useState("- ");

    useEffect(() => {
        var timer = setInterval(() => {
            axios
                .get("/mqtt/sensors1")
                .then((response) => {
                    var answer = response.data["pressure"];
                    if (answer == null) {
                        setPressure("- ");
                    } else {
                        setPressure(Math.round(answer).toString());
                    }
                    setPressure(1012)
                })
                .catch((err) => console.log(err));
        }, UPDATE_INTERVAL);

        return function cleanup() {
            clearInterval(timer);
        };
    });

    return (
        <div className="sensor">
            <img
                src="/pressure.svg"
                className="Pressure"
                alt="press"
                width="70cm"
                height="70cm"
            />
            <h1>{pressure}</h1>
        </div>
    );
}
