import React from "react";
import Header from "./Header.js";
import { Grid, Paper, Typography } from '@mui/material';
import MySwitch from "./Switch.js";
import "./ControlPage.scss";
import { makeStyles } from "@material-ui/core";


function ControlPage() {
    const paperStyle = {
        display: "flex",
        backgroundColor: 'rgba(202, 200, 200, 0.4)', // Измените на ваш желаемый цвет фона
        padding: "16",
        textAlign: 'center',
        padding: "16px",
        textAlign: "center",
        marginTop: "10%",
        height: "3cm",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "15px",
        boxShadow: "0px 0px 0px 0px",
        fontSize: "20px",
        gap: "10px",
    };

    return (
        <div>
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
                            <MySwitch />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>

    );
}


export default ControlPage;
