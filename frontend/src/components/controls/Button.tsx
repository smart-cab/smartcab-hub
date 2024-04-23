import "./Button.scss";
import Button from "@mui/material/Button";

export default function MyButton({
    text,
    button_type,
    hook,
    style,
}: {
    text: string;
    button_type: string;
    hook?: () => void;
    style: object;
}) {
    const buttonStyle =
        button_type == "ButtonRed"
            ? {
                  fontFamily: "montserratAlternates",
                  height: "10%",
                  width: "7%",
                  fontSize: "0.85em",
                  backgroundColor: "#f86f6f",
                  borderColor: "#cf5237",
                  color: "#000",
                  borderRadius: "10px",
                  borderWidth: "3px",
              }
            : {
                  fontFamily: "montserratAlternates",
                  height: "80%",
                  width: "90%",
                  fontSize: "0.85em",
                  backgroundColor: "#a7dff0",
                  borderColor: "#7da4b0",
                  color: "#000",
                  borderRadius: "15px",
                  borderWidth: "55px",
              };
    return (
        <Button
            style={{...buttonStyle, ...style}}
            variant="contained"
            size="large"
            onClick={hook}
        >
            {text}
        </Button>
    );
}
