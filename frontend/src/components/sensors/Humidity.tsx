import { useState, useEffect } from "react";
import axios from "axios";
import UPDATE_INTERVAL from "../config";
import "./Sensor.scss";
import SensorWarning from "./SensorWarning";

export default function Humidity() {
    const [humidity, setHumidity] = useState("- ");

    useEffect(() => {
        var timer = setInterval(() => {
            axios
                .get("/mqtt/sensors2")
                .then((response) => {
                    var answer = response.data["humidity"];
                    if (answer == null) {
                        setHumidity("- ");
                    } else {
                        setHumidity(Math.round(answer).toString());
                    }
                    setHumidity(29)
                })
                .catch((err) => console.log(err));
        }, UPDATE_INTERVAL);

        return function cleanup() {
            clearInterval(timer);
        };
    });

    if (Number(humidity) < 30) {
        return (
            <div className="sensor">
                <SensorWarning width="8%" />
                <img
                    src="/humidity.svg"
                    className="Humidity"
                    alt="humidity"
                    width="40cm"
                    height="40%"
                    style={{ zIndex: 11 }}
                />
                <h1 style={{ color: "black", zIndex: 11 }}>{humidity}%</h1>
            </div>
        );
    } else {
        return (
            <div className="sensor">
                <div style={{ zIndex: 11 }}>
                    <img
                        src="/humidity.svg"
                        className="Humidity"
                        alt="humidity"
                        width="40cm"
                        height="40%"
                    />
                </div>
                <h1 style={{ color: "black", zIndex: 11 }}>{humidity}%</h1>
            </div>
        );
    }
}
