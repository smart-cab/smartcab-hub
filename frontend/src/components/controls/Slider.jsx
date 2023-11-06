import React from "react";
import 'toolcool-range-slider';
import "./Slider.scss";


function MySlider({min, max, current_value=(max - min)/2, step=1}) {
    return (
        <div>
            <tc-range-slider 
                slider-width="12em"
                slider-bg="lightgrey"
                slider-bg-fill="#81D7DD"
                
                min = {`${min}`}
                max = {`${max}`}
                value = {`${current_value}`}
                step = {`${step}`}
            />
            <script src="toolcool-range-slider.min.js"></script>
        </div>
    );
}


export default MySlider;

