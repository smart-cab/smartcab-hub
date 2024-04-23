import React, { useState } from "react";
import "./GradeCard.scss";
import Hiding from "../components/Hiding";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { BACKADDR } from "../const";

function Voting(code: string) {
    axios
        .post(`${BACKADDR}/new_vote`, {
            params: {
                vote: code,
            },
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
}

function GradeButton({ left, top, icon, color, onClick }) {
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        setIsPressed(true);
    };

    const handleRelease = () => {
        setIsPressed(false);
    };

    const buttonStyle = {
        width: isPressed ? "30%" : "20%", // Изменяем ширину изображения
        transition: "width 0.4s", // Добавляем плавность анимации
        transform: "translate(-50%, -50%)", // Центрируем изображение
        borderRadius: "40%",
        left: left,
        top: top,
        zIndex: 51,
        borderWidth: 0,
        position: "fixed",
    };

    return (
        <div>
            <div
                className="shadow"
                style={{
                    width: isPressed ? "23%" : "16%",
                    height: isPressed ? "23%" : "16%",
                    position: "fixed",
                    transition: "width 0.2s", // Добавляем плавность анимации
                    zIndex: 50,
                    transform: "translate(-50%, -50%)", // Центрируем изображение
                    left: left,
                    top: top,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${color} 0%, ${color} 100%)`,
                    filter: "blur(70px)",
                }}
            />
            <img
                className="GradeButton"
                onClick={onClick}
                style={buttonStyle}
                onMouseDown={handlePress}
                onMouseUp={handleRelease}
                onMouseLeave={handleRelease}
                onTouchStart={handlePress}
                onTouchEnd={handleRelease}
                src={icon}
                alt="grade-best"
            />
        </div>
    );
}

function GradeCard({ isShown, setIsShown }) {
    const CloseHiding = (_) => {
        setIsShown(false);
    };

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (_: React.SyntheticEvent<Element, Event>) => {
        setOpen(false);
    };

    const [isFrozen, setFrozen] = useState(false);

    const freezePage = () => {
        setFrozen(true);
        setTimeout(() => {
            setFrozen(false);
        }, 2000);
    };

    return (
        <div>
            {isShown && (
                <div>
                    <Hiding layout="all" />

                    <button className="CloseHiding" onClick={CloseHiding}>
                        <img width="45px" src="close2.png" alt="close2" />
                    </button>

                    {isFrozen && (
                        <div
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                background: "rgba(255, 255, 255, 0.0)",
                                zIndex: 9999,
                            }}
                        ></div>
                    )}

                    <Snackbar
                        open={open}
                        autoHideDuration={2100}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        style={{ top: "80%" }}
                    >
                        <Alert
                            onClose={handleClose}
                            severity="success"
                            style={{
                                flexDirection: "row",
                                borderRadius: "30px",
                                height: "50px",
                                width: "300px",
                            }}
                        >
                            Спасибо! Ваш голос учтён
                        </Alert>
                    </Snackbar>

                    <div className="card">
                        <h1 className="card-title">Как вам урок?</h1>

                        <GradeButton
                            top="60%"
                            left="15%"
                            icon="grade-best.png"
                            color="red"
                            onClick={function (event) {
                                Voting("beast");
                                handleOpen();
                                freezePage();
                            }}
                        />
                        <GradeButton
                            top="60%"
                            left="38%"
                            icon="grade-thinking.png"
                            color="	#7F00FF"
                            onClick={function (event) {
                                Voting("thinking");
                                handleOpen();
                                freezePage();
                            }}
                        />
                        <GradeButton
                            top="60%"
                            left="62%"
                            icon="grade-sleep.png"
                            color="#0096FF"
                            onClick={function (event) {
                                Voting("sleep");
                                handleOpen();
                                freezePage();
                            }}
                        />
                        <GradeButton
                            top="56%"
                            left="85%"
                            icon="grade-headboom.png"
                            color="green"
                            onClick={function (event) {
                                Voting("headboom");
                                handleOpen();
                                freezePage();
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default GradeCard;
