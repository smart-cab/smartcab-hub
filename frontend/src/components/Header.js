import React, { useState, useEffect } from "react"
import {Time, Co2, Humidity, Temp} from "./Sensors"
import './Header.css'


export default function Header() {

    return (
        <header className="Header">

            <div className="HeaderGroup">
                <div className="HeaderElement">
                    <img src="/only_cube_logo.png" className="Logo" alt="logo" width="110cm" height="110cm"/>
                    <Time />
                </div>
            </div>

            <div className="HeaderGroup" style={{marginRight: 1 + "cm"}}>

                <div className="HeaderElement">
                    <img src="/co2.svg" className="Co2" alt="co2" width="55cm" height="55cm" style={{marginRight: 0.3 + "cm"}}/>
                    <Co2 />
                </div>

                <div className="HeaderElement">
                    <img src="/humidity.svg" className="Humidity" alt="humidity" width="40cm" height="40%"/>
                    <Humidity />
                </div>
                
                <div className="HeaderElement">
                    <img src="/temp.svg" className="Temp" alt="temp" width="45cm" height="45cm" />
                    <Temp />
                </div>

            </div>
        </header>   
    );
}
