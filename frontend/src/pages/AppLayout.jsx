import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";


const AppLayout = () => {
    return <div style={{
        padding: '0px 0px 0px 250px',
    }}>
        <Sidebar />
        <Outlet />
    </div>;
};

export default AppLayout;
