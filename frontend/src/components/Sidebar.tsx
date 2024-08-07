import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";
import Time from "./sensors/Time";
import PinLockButton from "./PinLockButton";
import SOSButton from "./VoIP";

const sidebarNavItems = [
    {
        display: "Управление",
        icon: <i className="bx bx-user"></i>,
        to: "/",
        section: "control",
    },
    {
        display: "Статистика",
        icon: <i className="bx bx-user"></i>,
        to: "/statistics",
        section: "statistics",
    },
    /* {
     *     display: "Конференция",
     *     icon: <i className="bx bx-user"></i>,
     *     to: "/conference",
     *     section: "conference",
     * }, */
];

function Sidebar({ pinLocked, setPinLocked }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            if (
                sidebarRef.current !== undefined &&
                indicatorRef.current !== undefined
            ) {
                const sidebarItem = sidebarRef.current.querySelector(
                    ".sidebar__menu__item",
                );
                indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
                setStepHeight(sidebarItem.clientHeight);
            }
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split("/")[1];
        const activeItem = sidebarNavItems.findIndex(
            (item) => item.section === curPath,
        );
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return (
        <div className="sidebar">
            <div>
                <div className="HeaderGroup">
                    <div
                        className="HeaderElement"
                        style={{ paddingBottom: "0.1cm" }}
                    >
                        <img
                            src="emblema_logo.png"
                            className="Logo"
                            alt="logo"
                            width="35%"
                            height="35%"
                            style={{
                                marginTop: "10px",
                                marginRight: "15px",
                                paddingLeft: "20px",
                            }}
                        />
                        <Time />
                    </div>
                </div>
                <div ref={sidebarRef} className="sidebar__menu">
                    <div
                        ref={indicatorRef}
                        className="sidebar__menu__indicator"
                        style={{
                            transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`,
                        }}
                    ></div>
                    {sidebarNavItems.map((item, index) => (
                        <Link to={item.to} key={index}>
                            <div
                                className={`sidebar__menu__item ${activeIndex === index ? "active" : ""}`}
                            >
                                <div
                                    className="sidebar__menu__item__text"
                                    style={{ zIndex: 99 }}
                                >
                                    {item.display}
                                </div>
                                <div className="sidebar__menu__item__icon">
                                    {item.icon}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="icons">
                <PinLockButton
                    pinLocked={pinLocked}
                    setPinLocked={setPinLocked}
                />
            </div>
        </div>
    );
}

export default Sidebar;
