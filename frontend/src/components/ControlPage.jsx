import React from "react";
import Header from "./Header";
import { Grid, Paper } from '@mui/material';
import MySwitch from "./controls/Switch";
import MyButton from "./controls/Button";
import "./ControlPage.scss";
import MySlider from "./controls/Slider";
import Footer from "./Footer";


function ControlPage() {
    const paperStyle = {
        display: "flex",
        backgroundColor: 'rgba(202, 200, 200, 0.4)', 
        padding: "16",
        textAlign: 'center',
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

    return (
        <div style={{ marginBottom: '5em' }}>
            <Header />
            <div className="TabPage">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <p>Лампа LW204</p>
                            <MySwitch />
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
                            <MyButton text={"Закрыть кабинет"} button_type={"ButtonBlue"}/>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <p>Яркость лампы QWER99</p>
                            <MySlider />
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
                            <p>Яркость лампы QWER99</p>
                            <MySlider />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <MyButton text={"Закрыть кабинет"} button_type={"ButtonBlue"}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </div>

    );
}


export default ControlPage;
