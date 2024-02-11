import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AppLayout = () => {
    return (
        <div style={{ paddingLeft: 250 }}>
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default AppLayout;
