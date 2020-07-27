import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getState = () => ({
    labels: [
        'Red',
        'Green',
        'Yellow'
    ],
    datasets: [{
        data: [getRandomInt(50, 200), getRandomInt(100, 150), getRandomInt(150, 250)],
        backgroundColor: [
            '#CCC',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
});

export default function DynamicDoughnut() {

    const[state, setState] = useState(getState());
    
    useEffect(() => {
        setInterval(() => {
            setState(getState());
        }, 1000);
    });
    return (
            <div>
                <h2>Dynamicly refreshed Doughnut Example</h2>
                <Doughnut
                    data={state}
                    width={400}
                    height={400}
                />
            </div>
    )
     
}