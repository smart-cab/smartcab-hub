import React, { useState, useEffect } from "react"
import axios from "axios"
import UPDATE_INTERVAL from "../config"


export default function Co2() {
    const [co2, setCo2] = useState(0);

    useEffect(() => {
        var timer = setInterval(()=> {
            axios.get("http://127.0.0.1:5000/device/sensors2")
                .then((response) => {
                        setCo2(Math.round(response.data["co2"]))
                    })
                .catch(err => console.log(err));

        }, UPDATE_INTERVAL)

        return function cleanup() {
            clearInterval(timer)
        }
    });

    if (co2 > 400) {
        return (
             <h1 style={{color: 'red'}}>{co2}</h1>
        )
    } else {
        return (
            <h1>{co2}</h1>
        )
    }


}
