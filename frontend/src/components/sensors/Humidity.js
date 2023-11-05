import React, { useState, useEffect } from "react"
import axios from "axios"
import UPDATE_INTERVAL from "../config"


export default function Humidity() {
    const [humidity, setHumidity] = useState(0);

    useEffect(() => {
        var timer = setInterval(()=> {
            axios.get("http://127.0.0.1:5000/get_humidity")
                .then((response) => {
                        setHumidity(Math.round(response.data["humidity"]))
                    })
                .catch(err => console.log(err));

        }, UPDATE_INTERVAL)

        return function cleanup() {
            clearInterval(timer)
        }
    });

    return (
        <h1>{humidity}%</h1>
    );
}
