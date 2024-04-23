import { Outlet } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Pin from "../components/Pin";
import { useState, useRef, useEffect } from "react";
import GradeCard from "./GradeCard";
import { BACKADDR } from "../const";
import Header from "../components/Header";
import SOSButton from "../components/VoIP";

const GRADE_CARD_LIFETIME = 1;
const GRADE_CARD_START_DELTA = 1;

function parseTimeFromString(time: string) {
    const [hours, minutes] = time.split(":");
    const lessonTime = new Date();
    lessonTime.setHours(parseInt(hours));
    lessonTime.setMinutes(parseInt(minutes));

    return lessonTime;
}

export default function AppLayout() {
    const [schedule, setSchedule] = useState([]);
    const [pinLocked, setPinLocked] = useState(true);
    const [isShown, setIsShown] = useState(false);
    const scheduleActivated = useRef(false);

    // const schedule = [
    //     {start: "08:30", end: "15:55"},
    //     {start: "11:46", end: "13:47"},
    // ]
    const fetchSchedule = async () => {
        try {
            BACKADDR;
            const response = await axios.get(`${BACKADDR}/get_schedule`, {
                params: {},
            });
            // console.log(response.data.data)
            setSchedule(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    function doStuff() {
        for (const lesson of schedule) {
            const now = new Date();
            const lessonTime = parseTimeFromString(lesson["end"]);

            const beforeLessonTime = new Date(lessonTime);
            beforeLessonTime.setMinutes(
                lessonTime.getMinutes() - GRADE_CARD_START_DELTA,
            );

            const afterLessonTime = new Date(lessonTime);
            afterLessonTime.setMinutes(
                lessonTime.getMinutes() + GRADE_CARD_LIFETIME,
            );

            if (
                now.getHours() == beforeLessonTime.getHours() &&
                now.getMinutes() == beforeLessonTime.getMinutes() &&
                !scheduleActivated.current
            ) {
                setIsShown(true);
                scheduleActivated.current = true;
            } else if (
                now.getHours() == afterLessonTime.getHours() &&
                now.getMinutes() == afterLessonTime.getMinutes()
            ) {
                console.log("end");
                setIsShown(false);
                scheduleActivated.current = false;
            }
        }
    }
    setInterval(doStuff, 1000);
    useEffect(() => {
        fetchSchedule();
    }, []);

    return (
        <div style={{ paddingLeft: 250 }}>
            <Sidebar pinLocked={pinLocked} setPinLocked={setPinLocked} />
            <Header />
            <GradeCard isShown={isShown} setIsShown={setIsShown} />
            <SOSButton />
            <Pin
                locked={pinLocked}
                setLocked={setPinLocked}
                lockedView=<Outlet />
            />
        </div>
    );
}
