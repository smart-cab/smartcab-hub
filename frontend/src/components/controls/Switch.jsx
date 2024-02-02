import React from "react";
import axios from "axios";
import {Switch} from "antd";
import "./Switch.scss";
import Ripples from 'react-ripples';


function useSocket(checked, event) {
    let opt = "";
    if (checked) {
        opt = "ON"
    } else {
        opt = "OFF"
    }
    axios.post('/dev_control', null,
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
