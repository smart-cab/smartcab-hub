import React, { useState, useEffect } from "react"
import Co2 from "./sensors/Co2"
import Temp from "./sensors/Temp"
import Humidity from "./sensors/Humidity"
import Pressure from "./sensors/Pressure"
import './Header.scss'


function Header() {

    return (
        <header className="Header">

            <div className="HeaderGroup" style={{marginRight: 1 + "cm"}}>

                <div className="HeaderElement">
                    <img src="/pressure.svg" className="Pressure" alt="press" width="70cm" height="70cm" />
                    <Pressure />
                </div>

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


export default Header;
