import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import ProfileSideComponent from './ProfileSideComponent';
import { AppContext } from '../AppContext';
import { useContext } from 'react'
import axiosObj from './axios';
Chart.register(...registerables)

export default function DashHome() {
  const { mode, user, setState } = useContext(AppContext)
  const [ income, setIncome ] = useState(0)
  const [ usern, setUser ] = useState({followers: "-", user_name: "-"})
  //g-api call request for income
  // const author = JSON.parse(Buffer.from(localStorage.getItem('access'), 'base64'))
  useEffect(() => {
    setUser(user)
  },[income])
  const profileBoxStyle = {light:{textColor: "black"},dark:{textColor: "#ffffffdd", backgroundColor: "#0400ff1a"},common:{}}
  const dupProfileBoxStyle = {...profileBoxStyle.common,...(mode==="light" ? {textColor: "black"} : {textColor: "#ffffffdd", backgroundColor: "#ffffff12"})}
  const dupWelcomeBoxStyle = {...profileBoxStyle.common,...(mode==="light" ? {textColor: "black", border: "2px dashed black"} : {textColor: "white", border: "2px dashed #5c5afa"})}
  const dupPerfoBoxStyle = {...profileBoxStyle.common,...(mode==="light" ? {textColor: "#5c5afa"} : {textColor: "white", backgroundColor: "#02022a"})}
  const dupBlogBoxStyle = {...profileBoxStyle.common,...(mode==="light" ? {backgroundColor: "rgba(0, 0, 0, 0.06)"} : {backgroundColor: "rgb(18 18 55)"})}
  const data = {
    labels: ['10/9', '11/9', '12/9', '13/9', '14/9', '15/9', '16/9', '17/9', '18/9', '19/9', '20/9', '21/9', '22/9', '23/9', '24/9'],
    datasets: [{
      label: "Blog-name-something-at-the-rate",
      data: [12001, 19033, 36102, 15674, 25123, 22234, 41023, 44045, 59030, 36102, 15674, 25123, 22234, 41023, 44045],
      fill:true,
      backgroundColor: "#5c5afa2b",
      borderColor: "#5c5afa",
      borderWidth: 3,
      pointRadius: 3,
      gridColor: "red",
      borderCapStyle: "round",
      pointBackgroundColor: "#5c5afa",
    },
  ]
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          display: true
        },
        grid: {
          display: true,
          drawBorder: true
        }
      },
      x: {
        ticks: {
          display: false
        },
        grid: {
          display: true,
          drawBorder: true
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <div className="cont">
            <div className="box-1" style={dupProfileBoxStyle}>
              <div className='box-1-1'>
                <h2>Dash-Home</h2>
                <div className="grid-box-1">
                    <div className="welcome-box" style={dupWelcomeBoxStyle}>
                        <h3>Welcome {usern.user_name}!</h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid inventore distinctio est sunt, velit nam reprehenderit quis tempora blanditiis maiores.</p>
                    </div>
                    <div className="performance-box" style={dupPerfoBoxStyle}>
                      <div className="followers-count">
                      <div className="follower-chart" status="increased">
                      <i className="fi fi-rr-arrow-small-up"></i>
                      </div>
                        <div className="text">
                          <h3>{usern.followers}</h3>
                          <span>Followers &gt;</span>
                        </div>
                      </div>
                      <div className="blogs-published">
                      <div className="income-chart" status="decreased">
                      <i className="fi fi-rr-arrow-small-down"></i>
                      </div>
                        <div className="text">
                          <h3>${income}</h3>
                          <span>Current Income &gt;</span>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="grid-box-2" style={dupPerfoBoxStyle}>
                  <div className="popular-blogs">
                    <h3>Popular Blogs (of the Month)</h3>
                    <div className="blog-boxes">
                      <div className="blog-name-box active">
                        <h5>Blog-name-something-at-the-rate</h5>
                        <p className='p1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus, ipsum at ultricies porta, ipsum justo molestie urna, quis posuere nisl libero non diam. Nunc in fermentum dui. Pellentesque fringilla tempor felis. Suspendisse potenti. Proin et justo at nisi lobortis dignissim condimentum a libero.</p>
                        <p className='p2'><span>30k views</span></p>
                      </div>
                      <div className="blog-name-box" style={dupBlogBoxStyle}>
                        <h5>Blog-name-something-at-the-rate</h5>
                        <p className='p1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus, ipsum at ultricies porta, ipsum justo molestie urna, quis posuere nisl libero non diam. Nunc in fermentum dui. Pellentesque fringilla tempor felis. Suspendisse potenti. Proin et justo at nisi lobortis dignissim condimentum a libero.</p>
                        <p className='p2'><span>30k views</span></p>
                      </div>
                      {/* <div className="blog-name-box" style={dupBlogBoxStyle}>
                        <h5>Blog-name-something-at-the-rate</h5>
                        <p className='p1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus, ipsum at ultricies porta, ipsum justo molestie urna, quis posuere nisl libero non diam. Nunc in fermentum dui. Pellentesque fringilla tempor felis. Suspendisse potenti. Proin et justo at nisi lobortis dignissim condimentum a libero.</p>
                        <p className='p2'><span>30k views</span></p>
                      </div> */}
                    </div>
                  </div>
                  {/* <div className="popular-blogs-chart">
                    <Line
                      height={50}
                      width={60}
                      data={data}
                      options={options}
                    />
                  </div> */}
                </div>
              </div>
            </div>
                      
        </div>
    )
}