import React, { useEffect, useState} from 'react';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-avataaars-sprites';
import { useHistory } from 'react-router-dom';
import ButtonComp from "./ButtonComp";
import { AppContext } from '../AppContext';
import axiosObj from './axios';
import { useContext } from 'react'

let svg = createAvatar(style, {
  seed: 'custom-seed',
});

export default function ProfileSideComponent() {
    const history = useHistory()
    const { mode, user, rank, setState } = useContext(AppContext)
    const profileBoxStyle = {light:{color: "black"},dark:{color: "#ffffffc0"},common:{}}
    const dupProfileBoxStyle = {...profileBoxStyle.common,...(mode==="light" ? profileBoxStyle.light : profileBoxStyle.dark)}
    const boxStyle = {light:{backgroundColor: "rgba(0,0,0,0.03)"},dark:{backgroundColor: "#ffffff10"},common:{}}
    const dupBoxStyle = {...boxStyle.common,...(mode==="light" ? {color: "black"} : {color: "#5c5afa"})}
    const [income, setIncome] = useState(0)
    const [author, setAuthor] = useState({})
    const [topRank, settopRank] = useState('-')
    const [totRank, settotRank] = useState('-')
    const [Ranklen, setRanklen] = useState(0)
    const [sup, setSup] = useState('-')
    let usern = user ? user : { user_name: "-", followers: 0}
    //g-api call request for income
    useEffect(() => {
        const setuser = () => {
        axiosObj.get(`user/${localStorage.getItem('id')}/`).then(res => {
            setAuthor(res.data.user)
            settopRank(res.data.topic_rank)
            settotRank(res.data.total_rank)
            setRanklen(res.data.topic_rank.toString().length)
            if(res.data.topic_rank.toString()[Ranklen-1] === '1') { setSup('st') }
            else if(res.data.topic_rank.toString()[Ranklen-1] === '2') { setSup('nd') }
            else if(res.data.topic_rank.toString()[Ranklen-1] === '3') { setSup('rd') }
            else { setSup('th') }
        })
        }
        setuser();
    }, [income])
    const sDate = (new Date(author.start_date)).toDateString("en-US")
    const handleLogout = (e) => {
        e.preventDefault()
        axiosObj.post(`user/logout/blacklist/`, { refresh_token: localStorage.getItem('refresh') }).then(res => {
            localStorage.removeItem("access", res.access)
            localStorage.removeItem("refresh", res.refresh)
            setState({user: {}})
            history.push("/login")
        })
    }
    const handleDarkMode = (e) => {
        let NewMode = mode=="dark" ? "light" : "dark"
        console.log(NewMode)
        setState({mode: NewMode})
    }
    return (
            <div className="picture-box">
                <div className="cont-picture-box">
                    <div>
                        <img src="https://avatars.dicebear.com/api/personas/male/seed.svg?s=male&body=squared&mouth=smile&eyes=open&b=lightGrey"/>
                    </div>
                </div>
                <div className='profile-box' style={dupProfileBoxStyle}>
                    <div className="logout-box">
                        {/* <div className="enable-dark-mode" style={dupBoxStyle}>
                            <ButtonComp/>
                        </div> */}
                        <div onClick={handleDarkMode} className="enable-dark-mode" style={dupBoxStyle}>
                            <i className="fi fi-rr-bulb"></i>
                        </div>
                        <button onClick={handleLogout} className="cont-logout" style={dupBoxStyle}>
                            <i className="fi fi-rr-sign-out-alt"></i>
                        </button>
                </div>
            </div>
            {/* <div className="profile">
                <div className="p-tabs">
                    <div className="profile-tab" style={dupBoxStyle}>
                        <h4>Joined on</h4>
                        <p>{sDate}</p>
                    </div>
                    <div className="profile-tab" style={dupBoxStyle}>
                        <h4>Followers</h4>
                        <p>{author.followers}</p>
                    </div>
                    <div className="profile-tab" style={dupBoxStyle}>
                        <h4>Status</h4>
                        {author.followers<1000?
                        <p className='not-verified'>Non-Verified</p>
                        :<p className='not-verified'>Verified</p>}
                    </div>
                </div>
            </div> */}
        {/* <div className="leaderboard-rank">
            <div className="rank-box">
                <h3>Leader-board</h3>
                <h4>Rank [topic - Science]</h4>
                <h2>{topRank}<sup>{sup}</sup></h2>
            </div>
        </div> */}
        </div>
    )
}
