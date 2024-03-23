import { useState } from "react";
import "./ControlPage.scss";
import {
    Alert,
    Grid,
    Paper,
    Snackbar,
    ThemeProvider,
    createTheme,
} from "@mui/material";

import Header from "../components/Header";
import MySwitch from "../components/controls/Switch";
import MyButton from "../components/controls/Button";
import MySlider from "../components/controls/Slider";
import Footer from "../components/Footer";
import GradeCard from "./GradeCard";
import axios from "axios";

async function turnComputersOff({ setAlertStatus, setAlertText }) {
    const computersAmount = 15;
    let requests = [];
    for (let i = 1; i <= computersAmount; i++) {
        requests.push(axios.get("/ssh/pc" + i + "?command=shutdown now"));
    }
    await axios
        .all(requests)
        .then(async (responses) => {
            for (let i = 1; i <= responses.length; i++) {
                let status = responses[i].value.data.status;
                if (status == "ok") {
                    setAlertStatus("success");
                    setAlertText("Компьютер №" + i + " успешно выключен");
                } else if (status == "error") {
                    setAlertStatus("success");
                    setAlertText("Компьютер №" + i + " не удалось выключить");
                }
            }
        })
        .catch((_) => {
            setAlertStatus("error");
            setAlertText("Произошла ошибка при попытке выключить компьютеры");
        });
}

const theme = createTheme({
    components: {
        // Name of the component
        MuiPaper: {
            styleOverrides: {
                // Name of the slot
                root: {
                    display: "flex",
                    backgroundColor: "rgba(202, 200, 200, 0.4)",
                    textAlign: "center",
                    padding: "16px",
                    marginTop: "0.8em",
                    height: "5.5em",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    borderRadius: "15px",
                    boxShadow: "0px 0px 0px 0px",
                    fontSize: "1.5em",
                    gap: "10px",
                },
            },
        },
    },
});

export default function ControlPage() {
    const [isShown, setIsShown] = useState(false);
    const [alertStatus, setAlertStatus] = useState("info");
    const [alertText, setAlertText] = useState("");

    return (
        <ThemeProvider theme={theme}>
            <div style={{ marginBottom: "5em" }}>
                <GradeCard isShown={isShown} setIsShown={setIsShown} />
                <Header />
                <div className="TabPage">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Paper>
                                <p>Свет 1</p>
                                <MySwitch url="/mqtt/power_socket1" />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                <MySlider
                                    title="Шторы 1"
                                    url="/mqtt/curtains_roller1"
                                />
                            </Paper>
                        </Grid>
                    </Grid>{" "}
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Paper>
                                <p>Свет 2</p>
                                <MySwitch url="" />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                <MyButton
                                    text={"Включить компы"}
                                    button_type={"ButtonBlue"}
                                    hook={() => 1}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Paper>
                                <MySlider title="Шторы 2" url="" />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                <MyButton
                                    text={"Оценить урок"}
                                    button_type={"ButtonBlue"}
                                    hook={() => setIsShown(true)}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Paper>
                                <p>Свет 3</p>
                                <MySwitch url="" />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                <MyButton
                                    text={"Выключить компы"}
                                    button_type={"ButtonBlue"}
                                    hook={() =>
                                        turnComputersOff({
                                            setAlertStatus,
                                            setAlertText,
                                        })
                                    }
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                <Footer />
                <Snackbar
                    open={alertText != ""}
                    onClose={() => setAlertText("")}
                    autoHideDuration={3000}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    style={{ top: "80%" }}
                >
                    <Alert
                        severity={alertStatus}
                        action=<div />
                        style={{ 
                            display: "flex", 
                            flexDirection: "row",
                            borderRadius: "30px", 
                            width: "410px", 
                            height: "70px" }}
                    >
                        {alertText}
                    </Alert>
                </Snackbar>
            </div>
        </ThemeProvider>
    );
}
