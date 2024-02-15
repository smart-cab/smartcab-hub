import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Pin from "../components/Pin";

const AppLayout = () => {
    return (
        <div style={{ paddingLeft: 250 }}>
            <Sidebar />
            <Pin lockedView=<Outlet /> />
        </div>
    );
};

export default AppLayout;
