import React from "react";
import axios from "axios";
import { Switch } from "antd";
import "./Switch.scss";
import Ripples from "react-ripples";

function useSocket({ checked, event, url }) {
    let state;
    if (checked) {
        state = "ON";
    } else {
        state = "OFF";
    }

    axios
        .post(url, null, { params: { value: state } }) // TODO убрать заглушку
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
}

function MySwitch({ url }) {
    return (
        <Switch
            onChange={(checked, event) => useSocket({ checked, event, url })}
            className="MySwitch"
        />
    );
}

export default MySwitch;
