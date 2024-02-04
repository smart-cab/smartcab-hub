import React, { useState, useEffect } from "react";
import axios from "axios";
import UPDATE_INTERVAL from "../config";
import "./Sensor.scss";
import SensorWarning from "./SensorWarning";

export default function Temp() {
    const [temp, setTemp] = useState(0);

    useEffect(() => {
        var timer = setInterval(() => {
            axios
                .get("/device/sensors1")
                .then((response) => {
                    var answer = response.data["temperature"];
                    if (answer == null) {
                        setTemp("- ");
                    } else {
                        setTemp(Math.round(answer));
                    }
                })
                .catch((err) => console.log(err));
        }, UPDATE_INTERVAL);

        return function cleanup() {
            clearInterval(timer);
        };
    });

    if (temp > 24 || temp < 17) {
        return (
            <div className="sensor">
                <SensorWarning width="9%" />
                <img
                    src="/temp.svg"
                    className="Temp"
                    alt="temp"
                    width="45cm"
                    height="45cm"
                    style={{ zIndex: 11 }}
                />
                <h1 style={{ color: "black", zIndex: 11 }}>{temp}°C</h1>
            </div>
        );
    } else {
        return (
            <div className="sensor">
                <img
                    src="/temp.svg"
                    className="Temp"
                    alt="temp"
                    width="45cm"
                    height="45cm"
                />
                <h1 style={{ color: "black" }}>{temp}°C</h1>
            </div>
        );
    }
}
