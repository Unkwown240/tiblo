import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function WelcomeDash() {
  const history = useHistory()
  useEffect(() => {
    document.querySelector(".welcome-backdrop").classList += " display-backdrop" 
    document.querySelector(".loading-bar").classList += " w-100" 
    setTimeout(() => {
      document.querySelector(".welcome-backdrop").classList.remove("display-backdrop")
      history.push("/dash/home")
    }, 5000)
  });
  return (
    <div className="welcome-backdrop display-backdrop">
      <div className="loading-bar"></div>
      <div className="logo-space"></div>
    </div>
  )
}
