import { PieChart } from "@mui/x-charts/PieChart";
import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { Paper } from "@mui/material";
import { BACKADDR } from "../const";
import Header from "./Header";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// const colorPaletteStatsiticGroupByCategory = {
//     beast: "#E30B5C",
//     thinking: "#7F00FF",
//     headboom: "green",
//     sleep: "#0096FF",
// };

const labelStatsiticGroupByCategory = {
    beast: "Супер",
    thinking: "Сложновато",
    headboom: "Взрыв мозга",
    sleep: "Скучно",
};

function parseStatisticsData(statisticsData) {
    const result = [];
    for (const eval_type in statisticsData) {
        result.push({
            value: statisticsData[eval_type],
            name: eval_type,
            label: labelStatsiticGroupByCategory[eval_type],
            // color: colorPaletteStatsiticGroupByCategory[eval_type]
        });
    }
    return result;
}

const paperStyle = {
    display: "flex",
    backgroundColor: "rgba(202, 200, 200, 0.4)",
    textAlign: "center",
    width: "16cm",
    paddingTop: "20px",
    marginTop: "0.8em",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: "15px",
    boxShadow: "0px 0px 0px 0px",
    fontSize: "1.5em",
    gap: "10px",
    flexWrap: "wrap",
};

function MyPieChart(statisticsData) {
    const data = statisticsData.data;
    return (
        <PieChart
            series={[
                {
                    data,
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -90,
                    endAngle: 180,
                },
            ]}
            width={400}
            height={300}
        />
    );
}

export default function Statistics() {
    const [statisticsData, setStatisticsData] = useState(null);
    const [groupByCategoryPeriod, setGroupByCategoryPeriod] = useState("*");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${BACKADDR}/get_statistic/lesson_grade/group_by_category`,
                    { params: { period: groupByCategoryPeriod } },
                );
                setStatisticsData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [groupByCategoryPeriod]);

    const handelSetGroupByCategryPeriod = (event) => {
        setGroupByCategoryPeriod(event.target.value);
    };

    return (
        <div>
            <Header />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingLeft: "2cm",
                }}
            >
                <Paper style={paperStyle}>
                    <h3>Статистика </h3>
                    <Select
                        style={{ fontFamily: "montserratAlternates" }}
                        value={groupByCategoryPeriod}
                        onChange={handelSetGroupByCategryPeriod}
                    >
                        <MenuItem value={1}>
                            <b>За день</b>
                        </MenuItem>
                        <MenuItem value={7}>
                            <b>За неделю</b>
                        </MenuItem>
                        <MenuItem value={30}>
                            <b>За месяц</b>
                        </MenuItem>
                        <MenuItem value={"*"}>
                            <b>За всё время</b>
                        </MenuItem>
                    </Select>
                    {statisticsData && (
                        <MyPieChart
                            data={parseStatisticsData(statisticsData.data)}
                        />
                    )}
                </Paper>
            </div>
        </div>
    );
}
