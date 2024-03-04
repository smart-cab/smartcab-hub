import MyButton from "./controls/Button";
import "./Footer.scss";

export default function Footer() {
    return (
        <header className="fixed-bottom Footer">
            <MyButton text={"SOS"} button_type={"ButtonRed"} />
        </header>
    );
}
