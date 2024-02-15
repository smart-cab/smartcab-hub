import React, { useState } from "react";
import "./ControlPage.scss";
import { Grid, Paper } from "@mui/material";

import Header from "../components/Header";
import MySwitch from "../components/controls/Switch";
import MyButton from "../components/controls/Button";
import MySlider from "../components/controls/Slider";
import Footer from "../components/Footer";
import GradeCard from "./GradeCard";


function ControlPage() {
    const paperStyle = {
        display: "flex",
        backgroundColor: "rgba(202, 200, 200, 0.4)",
        padding: "16",
        textAlign: "center",
        padding: "16px",
        textAlign: "center",
        marginTop: "0.8em",
        height: "5.5em",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "15px",
        boxShadow: "0px 0px 0px 0px",
        fontSize: "1.5em",
        gap: "10px",
    };

    const [isShown, setIsShown] = useState(false);

    return (
        <div style={{ marginBottom: "5em" }}>
            <GradeCard isShown={isShown} setIsShown={setIsShown}/>
            <Header />
            <div className="TabPage">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <p>Лампа LW204</p>
                            <MySwitch url="/device/power_socket1"/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <p>Свет 2</p>
                            <MySwitch />
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <p>Свет 1</p>
                            <MySwitch />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <MyButton
                                text={"Закрыть кабинет"}
                                button_type={"ButtonBlue"}
                            />
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <MySlider title="Шторы 1" url="/device/curtains_roller1"/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <p>Свет 1</p>
                            <MySwitch />
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <MySlider title="Шторы 2"/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <MyButton
                                text={"Оценить урок"}
                                button_type={"ButtonBlue"}
                                hook={() => setIsShown(true)}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </div>
    );
}

export default ControlPage;
