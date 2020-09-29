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
        backgroundColor: ["#3481ce", "#38a169", "#a3b1c0"],
        hoverBackgroundColor: ["#3481ce", "#38a169", "#a3b1c0"],
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
