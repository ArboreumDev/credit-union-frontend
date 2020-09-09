import { Center, Box } from "@chakra-ui/core"
import React from "react"
import { Line } from "react-chartjs-2"

const data = {
  labels: [
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
  ],
  datasets: [
    {
      label: "interest",
      legend: false,
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [5.65, 5.59, 5.8, 5.81, 5.9, 5.85, 6.0],
    },
  ],
}

const LineChart = () => (
  <Box minW="300px">
    <Center>
      <h4>Your Returns (APY)</h4>
    </Center>
    <Line data={data} width={360} height={360} />
  </Box>
)

export default LineChart
