import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Paper } from "@mui/material";
import Header from "./Header";

// function addColorToStatisticData(colorSettings) {
//     for (const [key, value] of colorSettings)
// }

const paperStyle = {
    display: "flex",
    backgroundColor: "rgba(202, 200, 200, 0.4)",
    textAlign: "center",
    width: "16cm",
    paddingTop: "20px",
    marginTop: "0.8em",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "15px",
    boxShadow: "0px 0px 0px 0px",
    fontSize: "1.5em",
    gap: "10px",
};

export default function Statistics() {
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
                    <h3>За всё время</h3>
                    <PieChart
                        series={[
                            {
                                data: [
                                    {
                                        id: 0,
                                        value: 35,
                                        label: "Супер",
                                        color: "#E30B5C",
                                    },
                                    {
                                        id: 1,
                                        value: 20,
                                        label: "Сложновато",
                                        color: "#7F00FF",
                                    },
                                    {
                                        id: 2,
                                        value: 10,
                                        label: "Шок",
                                        color: "green",
                                    },
                                    {
                                        id: 3,
                                        value: 8,
                                        label: "Скучно",
                                        color: "#0096FF",
                                    },
                                ],
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
                </Paper>
                <Paper style={paperStyle}>
                    <h3>Последние 3 дня</h3>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C' ] }]}
                      series={[{ data: [4, 3, 5] }, { data: [9, 1, 6] }, { data: [2, 5, 6] }, { data: [2, 5, 6] }]}
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
