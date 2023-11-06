import React from "react";
import Ripples from 'react-ripples';
import "./Button.scss";
import { createRipples } from 'react-ripples'


const MyRipples = createRipples({
    color: '#7da4b054',
    during: 500,
    borderRadius: "10px",
})


function MyButton({text, button_type}) {
    console.log(button_type);
    return (
        <MyRipples>
            <button className={button_type}> 
                <p>{text}</p>
            </button>
        </MyRipples>
    );
}


export default MyButton;
