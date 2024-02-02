import React from "react";
import axios from "axios";
import {Switch} from "antd";
import "./Switch.scss";
import Ripples from 'react-ripples';


function useSocket(checked, event) {
    const state = "ON" ? checked : "OFF";
    axios.post("/device/test", null, { params: { value: state } }) // TODO убрать заглушку
    .then((response) => {
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
