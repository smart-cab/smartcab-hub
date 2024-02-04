import React from "react";
import "toolcool-range-slider";
import "./Slider.scss";

function MySlider({ min, max, current_value = (max - min) / 2, step = 1 }) {
    return (
        <div>
            <tc-range-slider
                slider-width="11em"
                slider-bg="lightgrey"
                slider-bg-fill="#81D7DD"
                slider-height="0.6rem"
                pointer-radius="1rem"
                pointer-width="0.7rem"
                pointer-height="1.8rem"
                min={`${min}`}
                max={`${max}`}
                value={`${current_value}`}
                step={`${step}`}
            />
            <script src="toolcool-range-slider.min.js"></script>
        </div>
    );
}

export default MySlider;
