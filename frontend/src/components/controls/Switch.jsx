import React, {useState} from "react";
// import axios from "axios";
import {Switch} from "antd";
import "./Switch.scss";


function useSocket(checked, event) {
    if (checked) {
        // axios.post('http://127.0.0.1:5000/dev_control', {
        //     "dev_id": "0xa4c1382d21ae8016", 
        //     "option": "ON"
        // }).then((response) => {
        //     console.log(response.data);
        // }).catch((error) => {
        //     console.error(error);
        // })
        /*
        const data = { dev_id: "0xa4c1382d21ae8016", option: "ON"};
        const response = ky.post("http://127.0.0.1:5000/dev_control", {json: data}) 
        console.log(response);
        */
    } else {
        /*
        axios.post('http://127.0.0.1:5000/dev_control', {
            "dev_id": "0xa4c1382d21ae8016", 
            "option": "OFF"
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        })
        */
    }
}


import Ripples from 'react-ripples';
function MySwitch() {
    // const [state, setState] = useState(false);

    return (
        <Switch 
            onChange={useSocket}
            className="MySwitch"
        />
    );
}


export default MySwitch;
