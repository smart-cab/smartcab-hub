import React, { useState } from "react";
import axios from "axios";
import "./Slider.scss";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

function useRoller(_value, event) {
    axios
        .post("/device/curtains_roller1", null, {
            params: { field: "position", value: _value },
            // params: { field: "state", value: "ON" },
        }) // TODO убрать заглушку
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
}

function MySlider({
    name,
    min,
    max,
    current_value = (max - min) / 2,
    step = 1,
}) {
    const [value, setValue] = useState(50);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        axios
            .post("/device/curtains_roller1", null, {
                params: { field: "position", value: newValue },
                // params: { field: "state", value: "ON" },
            }) // TODO убрать заглушку
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

    };

    return (
        <div>
            <p>{name}</p>
            <Slider
                value={value}
                defaultValue={50}
                onChange={handleChange}
                step={10}
                marks
                min={0}
                max={100}
                valueLabelDisplay="auto"
                style={{ width: "7.3cm", height: "0.4cm", color: "#7adff0" }}
            />
        </div>
    );
}

export default MySlider;
