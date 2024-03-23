import { PieChart } from "@mui/x-charts/PieChart";
import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { Paper } from "@mui/material";
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
                    "http://localhost:5000/get_statistic/lesson_grade/group_by_category",
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
                
                <Paper style={paperStyle}>
                    <h3>Последние 3 дня</h3>
                    <BarChart
                        xAxis={[
                            {
                                scaleType: "band",
                                data: ["group A", "group B", "group C"],
                            },
                        ]}
                        series={[
                            { data: [4, 3, 5] },
                            { data: [9, 1, 6] },
                            { data: [2, 5, 6] },
                            { data: [2, 5, 6] },
                        ]}
                        width={500}
                        height={300}
                    />
                </Paper>
                <Paper style={paperStyle}>
                    <h3>Неделю</h3>
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
                        series={[
                            {
                                data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
                                showMark: ({ index }) => index % 2 === 0,
                            },
                            {
                                data: [9, 3, 8.5, 7.5, 1.5, 5, 2, 9, 3, 2],
                                showMark: ({ index }) => index % 2 === 0,
                            },
                            {
                                data: [5, 6, 8.5, 9.5, 5.5, 4, 3, 9, 3, 2],
                                showMark: ({ index }) => index % 2 === 0,
                            },
                            {
                                data: [1, 1, 2.5, 3.5, 4.5, 5, 7, 8, 9, 2],
                                showMark: ({ index }) => index % 2 === 0,
                            },
                        ]}
                        width={500}
                        height={300}
                    />
                </Paper>
                
            </div>
        </div>
    );
}
