import { useState } from "react";
import axios from "axios";
import Slider from "@mui/material/Slider";

let position_cache = new Map();

function MySlider({ title, url }: { title: string; url: string }) {
    const [_value, setValue] = useState(50);

    const handleChange = (
        _event: Event,
        newValue: number | number[],
        _number: number,
    ) => {
        if (Array.isArray(newValue)) {
            return;
        }

        position_cache.set(url, newValue);

        setValue(newValue);
        axios
            .post(url, null, {
                params: { field: "position", value: newValue },
            })
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
                value={position_cache.get(url)}
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
