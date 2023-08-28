import * as _ from 'lodash';
import * as React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function Genres({ label, data }) {

    const pieData = {
        labels: label,
        datasets: [{
            data: data,
            backgroundColor: ['#205072', '#329d9c', '#56c596', '#7be495', '#cff4d2']
        }],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }

    return (
        <div className="genreContainer" align="center">
            <div className="chart" style={{height: '68vh'}}>
              <Pie data={pieData} />
            </div>
        </div>
    )
}

export default Genres;