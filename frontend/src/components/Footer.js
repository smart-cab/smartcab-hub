import React from "react";
import MyButton from "./controls/Button.js";
import "./Footer.scss";

 
const Footer = () => {
    return (
        <header className="fixed-bottom Footer">
            <MyButton text={"SOS"} button_type={"ButtonRed"} />
        </header>
    );
};


export default Footer;
