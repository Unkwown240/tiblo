import React from 'react';
import ProfileSideComponent from './ProfileSideComponent';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
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
    fill:true,
    pointBackgroundColor: "#5c5afa",
    backgroundColor: "#5c5afa1a",
    borderWidth: 2.2,
    borderColor: "#5c5afa",
  }]
};

export default function DashEarnings() {

    return (
        <div className="cont">
            <div className="box-1">
                <h2>Dash-Earnings</h2>
                <div className="analytics-box">
                    <div className="chart-box">
                        <Line
                            width={30}
                            height={22}
                            data={data}
                            options={options}
                            />
                    </div>
                    <div className="control-box">
                        <div className="info">
                          <p><span id="prefix-span">$</span>868</p>
                          <p className='note'>Note : This is not accurate data. All the data is based on your previous progress for you to analyze.</p>
                        </div>
                        <p className='with-head'>With-drawal Methods - </p>
                        <button>Something</button>
                        <button>Something</button>
                        <button>Something</button>
                        <button>Something</button>
                        <button>Something</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
