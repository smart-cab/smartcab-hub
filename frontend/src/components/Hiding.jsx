import React from 'react';
import './Hiding.scss';


function Hiding(props) {
    if (props.layout == "all") {
        return (
            <div className="HidingAll" /> 
        )
    } else if (props.layout == "page") {
        return (
            <div className="HidingPage" /> 
        )
    } else {
        console.log("Not correct parameter for hiding component. Use 'all' or 'page'.")
    }

    
}


export default Hiding;
