import React, { useState, useEffect } from "react"
import axios from "axios"
import UPDATE_INTERVAL from "../config"
import "./Sensor.scss"


export default function Pressure() {
    const [pressure, setPressure] = useState(0);

    useEffect(() => {
        var timer = setInterval(()=> {
            axios.get("http://127.0.0.1:5000/device/sensors1")
                .then((response) => {
                        setPressure(Math.round(response.data["pressure"]))
                        // setPressure(1230)
                    })
                .catch(err => console.log(err));

        }, UPDATE_INTERVAL)

        return function cleanup() {
            clearInterval(timer)
        }
    });

    return (
        <div className="sensor">
            <img src="/pressure.svg" className="Pressure" alt="press" width="70cm" height="70cm" />
            <h1>{pressure}</h1>
        </div>
    );
}
