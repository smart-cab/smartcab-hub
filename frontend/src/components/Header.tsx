import Co2 from "./sensors/Co2";
import Temp from "./sensors/Temp";
import Humidity from "./sensors/Humidity";
import Pressure from "./sensors/Pressure";
import "./Header.scss";

export default function Header() {
    return (
        <header className="Header">
            <div className="HeaderGroup" style={{ marginRight: "0cm" }}>
                <div className="HeaderElement">
                    <Pressure />
                </div>

                <div className="HeaderElement">
                    <Co2 />
                </div>

                <div className="HeaderElement">
                    <Humidity />
                </div>

                <div className="HeaderElement">
                    <Temp />
                </div>
            </div>
        </header>
    );
}
