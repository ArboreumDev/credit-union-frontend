import React, { useState, useEffect } from "react"
import { Doughnut } from "react-chartjs-2"
import { Center, Box } from "@chakra-ui/core"

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getState = () => ({
  labels: [
    "Invested amount",
    "Pledge amount as supporter",
    "Uninvested amount",
  ],
  datasets: [
    {
      data: [
        getRandomInt(50, 200),
        getRandomInt(100, 150),
        getRandomInt(150, 250),
      ],
      backgroundColor: ["#CCC", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
})

export default function DynamicDoughnut() {
  const [state, setState] = useState(getState())

  useEffect(() => {
    // setInterval(() => {
    //     setState(getState());
    // }, 1000);
  })
  return (
    <Box minW="300px">
      <Center>
        <h4>Your Investing Portfolio</h4>
      </Center>
      <Doughnut data={state} width={360} height={360} />
    </Box>
  )
}
