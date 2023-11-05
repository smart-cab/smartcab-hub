import React from "react";
import Ripples from 'react-ripples';
import "./Button.scss";
import { createRipples } from 'react-ripples'


const MyRipples = createRipples({
    color: '#7da4b054',
    during: 500,
    borderRadius: "10px",
})


function MyButton({text}) {
    return (
        <MyRipples>
            <button className="ButtonBlue"> 
                <p>{text}</p>
            </button>
        </MyRipples>
    );
}


export default MyButton;
