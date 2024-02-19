import React from "react";
import "./Button.scss";
import Button from "@mui/material/Button";

function MyButton({ text, button_type, hook }) {
    if (button_type == "ButtonRed") {
        return (
            <Button
                style={{
                    fontFamily: "montserratAlternates",
                    height: "10%",
                    width: "7%",
                    fontSize: "0.85em",
                    backgroundColor: "#f86f6f",
                    borderColor: "#cf5237",
                    color: "#000",
                    borderRadius: "10px",
                    borderWidth: "3px",
                }}
                variant="contained"
                size="large"
                onClick={hook}
            >
                {text}
            </Button>
        );
    } else {
        return (
            <Button
                style={{
                    fontFamily: "montserratAlternates",
                    height: "80%",
                    width: "90%",
                    fontSize: "0.85em",
                    backgroundColor: "#a7dff0",
                    borderColor: "#7da4b0",
                    color: "#000",
                    borderRadius: "15px",
                    borderWidth: "55px",
                }}
                variant="contained"
                size="large"
                onClick={hook}
            >
                {text}
            </Button>
        );
    }
}

export default MyButton;
