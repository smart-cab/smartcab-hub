import { useState, useEffect } from "react";

export default function Time() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(() => setTime(new Date()), 1000);

        return function cleanup() {
            clearInterval(timer);
        };
    });

    return (
        <h1 className="MainTime">
            {time.toLocaleTimeString("ru", {
                hour: "2-digit",
                minute: "2-digit",
            })}
        </h1>
    );
}
