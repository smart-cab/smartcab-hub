import React, {useState} from "react";
import axios from "axios";
import {Switch} from "antd";
import "./Switch.scss";


function useSocket(checked, event) {
    let opt = "";
    if (checked) {
        opt = "ON"
    } else {
        opt = "OFF"
    }
    axios.post('http://127.0.0.1:5000/dev_control', null, 
            {
                params: {
                    dev_id: "0xa4c1382d21ae8016", 
                    option: opt 
                }
            }
    ).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.error(error);
    })
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
