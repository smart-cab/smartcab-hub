import "./SensorWarning.scss";

function SensorWarning({ width }: { width: string }) {
    return (
        <div
            className="sensor-warning"
            style={{ width: width, zIndex: 10 }}
        ></div>
    );
}

export default SensorWarning;
