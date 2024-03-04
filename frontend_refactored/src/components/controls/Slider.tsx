import React, { useState } from "react";
import axios from "axios";
import "./Slider.scss";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

let position_cache = {};

function MySlider({
    title,
    url,
    min,
    max,
    current_value = (max - min) / 2,
    step = 1,
}) {
    const [value, setValue] = useState(50);

    const handleChange = (event, newValue) => {
        position_cache[url] = newValue;

        setValue(newValue);
        axios
            .post(url, null, {
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
            <p>{title}</p>
            <Slider
                value={position_cache[url]}
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
