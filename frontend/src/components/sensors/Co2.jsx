import React, { useState, useEffect } from "react"
import axios from "axios"
import UPDATE_INTERVAL from "../config"
import "./Sensor.scss"
import SensorWarning from "./SensorWarning";


export default function Co2() {
    const [co2, setCo2] = useState(0);

    useEffect(() => {
        var timer = setInterval(()=> {
            axios.get("http://127.0.0.1:5000/device/sensors2")
                .then((response) => {
                        setCo2(Math.round(response.data["co2"]))
                        // setCo2(480)
                    })
                .catch(err => console.log(err));

        }, UPDATE_INTERVAL)

        return function cleanup() {
            clearInterval(timer)
        }
    });

    if (co2 > 400) {
        return (
            <div className="sensor">
                <SensorWarning width="12%"/>
                <div style={{zIndex: 11}}>
                    <img src="/co2.svg" className="Co2" alt="co2" width="55cm" height="55cm" style={{style: 11, marginRight: 0.3 + "cm"}}/>
                </ div>
                <h1 style={{color: 'black', zIndex: 11}}>{co2}%</h1>
            </div>
        )
    } else {
        return (
            <div className="sensor">
                <img src="/co2.svg" className="Co2" alt="co2" width="55cm" height="55cm" style={{marginRight: 0.3 + "cm"}}/>
                <h1>{co2}</h1>
            </div>
        )
    }


}
