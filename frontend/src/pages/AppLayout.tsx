import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Pin from "../components/Pin";
import { useState } from "react";

export default function AppLayout() {
    const [pinLocked, setPinLocked] = useState(true);

    return (
        <div style={{ paddingLeft: 250 }}>
            <Sidebar pinLocked={pinLocked} setPinLocked={setPinLocked} />
            <Pin
                locked={pinLocked}
                setLocked={setPinLocked}
                lockedView=<Outlet />
            />
        </div>
    );
}
