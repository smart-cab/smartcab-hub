import React, { useState, useEffect } from "react"
import axios from "axios"


const UPDATE_INTERVAL = 60_00


export function Time() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(()=>setTime(new Date()), 1000)

        return function cleanup() {
            clearInterval(timer)
        }
    });

    return (
        <h1 className="MainTime">{time.toLocaleTimeString("ru", {hour: "2-digit", minute:"2-digit"})}</h1>
    );

}


export function Co2() {
    const [co2, setCo2] = useState(0);

    useEffect(() => {
        var timer = setInterval(()=> {
            axios.get("http://127.0.0.1:5000/get_co2")
                .then((response) => {
                        setCo2(Math.round(response.data["co2"]))
                    })
                .catch(err => console.log(err));

        }, UPDATE_INTERVAL)

        return function cleanup() {
            clearInterval(timer)
        }
    });

    return (
        <h1>{co2}</h1>
    );
}


export function Humidity() {
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


export function Temp() {
    const [temp, setTemp] = useState(0);


    useEffect(() => {
        var timer = setInterval(()=> {
            axios.get("http://127.0.0.1:5000/get_temp")
                .then((response) => {
                        setTemp(Math.round(response.data["temp"]))
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
