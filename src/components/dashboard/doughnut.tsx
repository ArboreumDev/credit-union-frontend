import React from "react"
import { Doughnut } from "react-chartjs-2"

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function DynamicDoughnut({ amounts }: any) {
  const state = {
    labels: ["Invested", "Pledged", "Uninvested"],
    datasets: [
      {
        data: amounts,
        backgroundColor: ["#009C8A", "#71BF45", "#a3b1c0"],
        hoverBackgroundColor: ["#009C8A", "#71BF45", "#a3b1c0"],
      },
    ],
  }
  return (
    <Doughnut
      options={{ legend: false }}
      data={state}
      width={360}
      height={360}
    />
  )
}
