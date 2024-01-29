import React, { useState, useEffect } from "react"
import axios from "axios"
import UPDATE_INTERVAL from "../config"


export default function Temp() {
    const [temp, setTemp] = useState(0);


    useEffect(() => {
        var timer = setInterval(()=> {
            axios.get("http://127.0.0.1:5000/device/sensors1")
                .then((response) => {
                        setTemp(Math.round(response.data["temperature"]))
                    })
                .catch(err => console.log(err));

        }, UPDATE_INTERVAL)

        return function cleanup() {
            clearInterval(timer)
        }
    });

    return (
        <h1>{temp}°C</h1>
    );
}
