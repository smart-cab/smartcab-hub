import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Pin from "../components/Pin";
import { useState } from "react";
import GradeCard from "./GradeCard";


const GRADE_CARD_LIFETIME = 1
const GRADE_CARD_START_DELTA = 1

function parseTimeFromString(time: string) {
    const [hours, minutes] = time.split(":");
    const lessonTime = new Date();
    lessonTime.setHours(parseInt(hours));
    lessonTime.setMinutes(parseInt(minutes));

    return lessonTime
}


export default function AppLayout() {
    const [pinLocked, setPinLocked] = useState(true);
    const [isShown, setIsShown] = useState(false);

    const schedule = [
        {start: "08:30", end: "15:55"}, 
        {start: "09:30", end: "10:10"}, 
    ]

    function doStuff() {
        for (const lesson of schedule) {
            const now = new Date();
            const lessonTime = parseTimeFromString(lesson["end"]) 

            const beforeLessonTime = new Date(lessonTime)
            beforeLessonTime.setMinutes(lessonTime.getMinutes() - GRADE_CARD_START_DELTA)

            const afterLessonTime = new Date(lessonTime)
            afterLessonTime.setMinutes(lessonTime.getMinutes() + GRADE_CARD_LIFETIME)

            if (now.getHours() == beforeLessonTime.getHours() && now.getMinutes() == beforeLessonTime.getMinutes()) {
                setIsShown(true)
            } else if (now.getHours() == afterLessonTime.getHours() && now.getMinutes() == afterLessonTime.getMinutes()) {
                setIsShown(false)
            }
        }
        
    }
    setInterval(doStuff, 1000);

    return (
        <div style={{ paddingLeft: 250 }}>
            <Sidebar pinLocked={pinLocked} setPinLocked={setPinLocked} />
            <GradeCard isShown={isShown} setIsShown={setIsShown} />
            <Pin
                locked={pinLocked}
                setLocked={setPinLocked}
                lockedView=<Outlet />
            />
        </div>
    );
}
