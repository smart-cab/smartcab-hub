import React, { useState } from "react"
import './Header.css'


export default function Header() {
    const [co2, setCo2] = useState(129);
    const [humidity, setHumidity] = useState(89);
    const [temp, setTemp] = useState(23);
    const [time, setTime] = useState("13:24")

    return (
        <header className="Header">

            <div className="HeaderGroup">
                <div className="HeaderElement">
                    <img src="/only_cube_logo.png" className="Logo" alt="logo" width="110cm" height="110cm"/>
                    <h1 className="MainTime">{time}</h1>
                </div>
            </div>

            <div className="HeaderGroup" style={{marginRight: 1 + "cm"}}>

                <div className="HeaderElement">
                    <img src="/co2.svg" className="Co2" alt="co2" width="55cm" height="55cm" style={{marginRight: 0.3 + "cm"}}/>
                    <h1>{co2}</h1>
                </div>

                <div className="HeaderElement">
                    <img src="/humidity.svg" className="Humidity" alt="humidity" width="40cm" height="40%"/>
                    <h1>{humidity}</h1>
                </div>
                
                <div className="HeaderElement">
                    <img src="/temp.svg" className="Temp" alt="temp" width="45cm" height="45cm" />
                    <h1>{temp}°C</h1>
                </div>

            </div>
        </header>   
    );
}