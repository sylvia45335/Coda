import * as _ from 'lodash';
import * as React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import myCookies from '../cookies.js';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function Genres() {
    const [label, setLabel] = useState([]);
    const [data, setData] = useState([]);

    const PORT = process.env.REACT_APP_PORT;
    const apiURL = `http://localhost:${PORT}/api/artists`;

    useEffect(() => {
        axios({
            method: 'get',
            url: apiURL,
            withCredentials: false,
            headers: {
              Authorization: myCookies
            },
          }).then((res) => {
            // console.log(res.data);

            const poll = {};

            for(let i = 0; i < res.data.length; i++) {
                for(let j = 0; j < res.data[i].genres.length; j++) {
                    if(res.data[i].genres[j] in poll) {
                        poll[res.data[i].genres[j]] = poll[res.data[i].genres[j]] + 1;
                    } else {
                        poll[res.data[i].genres[j]] = 1;
                    }
                }
            }


            // console.log(poll);
            const labelSorted = Object.keys(poll).sort((a, b) => poll[b] - [a]);
            // console.log(labelSorted);
            const dataSorted = Object.values(poll).sort((a, b) => b-a);
            // console.log(dataSorted);
            const topLabels = [];
            const topData = [];
            for(let i = 0; i < 5; i++) {
                topLabels.push(labelSorted[i]);
                topData.push(dataSorted[i]);
            }

            // console.log(topLabels, topData);
            setLabel(topLabels);
            setData(topData);

          })
    },[]);

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