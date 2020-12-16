import { Center, Box } from "@chakra-ui/core"
import React from "react"
import { Line } from "react-chartjs-2"

const data = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Credit Line use overtime",
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
      data: [0, 55, 25, 40, 80, 90],
    },
  ],
}

const LineChart = () => (
  <Box minW="300px">
    <Center>{/* <h4>Credit Line use overtime</h4> */}</Center>
    <Line data={data} width={360} height={360} />
  </Box>
)

export default LineChart
