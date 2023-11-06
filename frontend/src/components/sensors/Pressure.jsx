import React, { useState, useEffect } from "react"
import axios from "axios"
import UPDATE_INTERVAL from "../config"


export default function Pressure() {
    const [pressure, setPressure] = useState(0);

    useEffect(() => {
        var timer = setInterval(()=> {
            axios.get("http://127.0.0.1:5000/get_pressure")
                .then((response) => {
                        setPressure(Math.round(response.data["pressure"]))
                    })
                .catch(err => console.log(err));

        }, UPDATE_INTERVAL)

        return function cleanup() {
            clearInterval(timer)
        }
    });

    return (
        <h1>{pressure}гПа</h1>
    );
}