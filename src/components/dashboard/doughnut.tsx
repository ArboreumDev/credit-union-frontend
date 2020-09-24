import React, { useState, useEffect } from "react"
import { Doughnut } from "react-chartjs-2"
import { Center, Box } from "@chakra-ui/core"

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function DynamicDoughnut({ amounts }: any) {
  const state = {
    labels: [
      "Uninvested amount",
      "Invested amount",
      "Pledge amount as supporter",
    ],
    datasets: [
      {
        data: amounts,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
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
