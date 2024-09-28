import React from 'react';
import ProfileSideComponent from './ProfileSideComponent';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
Chart.register(...registerables)

const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          display: true
        },
        grid: {
          display: true,
          drawBorder: false
        }
      },
      x: {
        ticks: {
          display: true
        },
        grid: {
          display: true,
          drawBorder: false
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

const data = {
    labels: ['10/9', '11/9', '12/9', '13/9', '14/9', '15/9', '16/9', '17/9', '18/9', '19/9', '20/9', '21/9', '22/9', '23/9', '24/9'],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55, 81, 56, 55,],
      backgroundColor: "#5c5afa1a",
      borderWidth: 2.2,
      borderColor: "#5c5afa",
    }]
  };


export default function DashAnalytics() {
    return (
        <div className="cont">
            <div className="box-1">
                <h2>Dash-Analytics</h2>
                <div className="analytics-box">
                    <div className="chart-box">
                        <Bar
                            width={30}
                            height={22}
                            data={data}
                            options={options}
                            />
                    </div>
                    <div className="control-box">
                        <div className="info">
                          <p>52868 <span id="prefix-span">views</span></p>
                          <p className='note'>Note : This is not accurate data. All the data is based on your previous progress for you to analyze.</p>
                        </div>
                        <p className='with-head'>Analytics - </p>
                        <button>Total Views</button>
                        <button>Earning Per Page</button>
                        <button>Something</button>
                        <button>Something</button>
                        <button>Something</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
