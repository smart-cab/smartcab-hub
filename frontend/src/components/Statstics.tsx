import { PieChart } from "@mui/x-charts/PieChart";
import { Paper } from "@mui/material";
import Header from "./Header";


const paperStyle = {
    display: "flex",
    backgroundColor: "rgba(202, 200, 200, 0.4)",
    textAlign: "center",
    width: "16cm",
    paddingTop: "20px",
    textAlign: "center",
    marginTop: "0.8em",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "15px",
    boxShadow: "0px 0px 0px 0px",
    fontSize: "1.5em",
    gap: "10px",
};

function getGradeData() {
    axios
        .get("/device/sensors2")
        .then((response) => {
            var answer = response.data["co2"];
            console.log(answer)
        })
        .catch((err) => console.log(err));
}


export default function Statistics() {
    return (
        <div>
            <Header />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                alignItems: "center",
                justifyContent: "flex-start", 
                paddingLeft: "2cm",
            }}>
                <Paper style={paperStyle}>
                    <h3>Оценки урока</h3>
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 35, label: "Супер", color: "#E30B5C" },
                                    { id: 1, value: 20, label: "Сложновато", color: "#7F00FF"},
                                    { id: 2, value: 10, label: "Шок", color: "green" },
                                    { id: 3, value: 8, label: "Скучно", color: "#0096FF" }, ],
                                innerRadius: 30,
                                outerRadius: 100,
                                paddingAngle: 5,
                                cornerRadius: 5,
                                startAngle: -90,
                                endAngle: 180,
                                margin: 100000,
                            },
                        ]}
                        width={400}
                        height={300}
                    />
                </Paper>
            </div>
        </div>
    );
}
