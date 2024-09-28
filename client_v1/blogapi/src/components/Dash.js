import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../AppContext';
import { Link, Route, useRouteMatch,useHistory } from "react-router-dom";
import DashHome from './DashHome';
import DashBlogs from './DashBlogs';
import DashAnalytics from './DashAnalytics';
import DashEarnings from './DashEarnings';
import DashAddNewBlog from './DashAddNewBlog';
import DashLeaderboard from './DashLeaderboard';
import Backdrop from './Backdrop';
import ProfileSideComponent from './ProfileSideComponent'
import WelcomeDash from './WelcomeDash';
import axiosObj from './axios';

export default function Dash() {
    const { mode, setState } = useContext(AppContext)
    const history = useHistory()
    const mainBoxStyle = {
        light:{
            backgroundColor: "white",
        },
        dark:{
            backgroundColor: "#02022a",
            color: "#ffffffc0",
        },
        common:{
        }
    }
    const picBoxStyle = {
        light:{
            color: "black"
        },
        dark:{
            color: "#5c5afa"
        },
        common:{
        }
    }
    const dupMainBoxStyle = {
        ...mainBoxStyle.common,
        ...(mode==="light" ? mainBoxStyle.light : mainBoxStyle.dark)
    }
    const dupPicBoxStyle = {
        ...picBoxStyle.common,
        ...(mode==="light" ? picBoxStyle.light : picBoxStyle.dark)
    }
    const [selected, setselected] = useState({});
    const { path } = useRouteMatch();
    const blogsBackdropParam = window.location.href.indexOf("blogs")===-1?false:true;
    const addBackdropParam = window.location.href.indexOf("add-new-blog")===-1?false:true;
    const link = window.location.href
    const onHome = link.split("/").slice(3,6).length === 1 || link.split("/").slice(3,6).length === 2
    const login = localStorage.getItem("access") && localStorage.getItem("refresh")
    const userno = 1
    let user = {}
    let rank = {}
    
 
    return (
        <>
            <div className="dash-container" style={dupMainBoxStyle}>
                {login?<>
                <div className="section-1">
                    <ul>
                        <li className="listitem-1">
                            {link.indexOf("/dash/home")!=-1?
                            <Link to="/dash/home" style={dupPicBoxStyle}><i className="fi fi-rr-home"></i></Link>
                            :<Link to="/dash/home" style={dupPicBoxStyle}><i className="fi fi-rr-home inactive"></i></Link>}
                        </li>
                        <li className="listitem-2">
                            {link.indexOf("/dash/add")!=-1?
                            <Link to="/dash/add-new-blog" style={dupPicBoxStyle}><i className="fi fi-rr-file-add"></i></Link>
                            :<Link to="/dash/add-new-blog" style={dupPicBoxStyle}><i className="fi fi-rr-file-add inactive"></i></Link>}
                        </li>
                        <li className="listitem-3">
                            {link.indexOf("/dash/blogs")!=-1?
                            <Link to="/dash/blogs" style={dupPicBoxStyle}><i className="fi fi-rr-document"></i></Link>
                            :<Link to="/dash/blogs" style={dupPicBoxStyle}><i className="fi fi-rr-document inactive"></i></Link>}
                        </li>
                        <li className="listitem-4">
                            {link.indexOf("/dash/leaderboard")!=-1?
                            <Link to="/dash/leaderboard" style={dupPicBoxStyle}><i className="fi fi-rr-chat-arrow-grow"></i></Link>
                            :<Link to="/dash/leaderboard" style={dupPicBoxStyle}><i className="fi fi-rr-chat-arrow-grow inactive"></i></Link>}
                        </li>
                        <li className="listitem-5">
                            {link.indexOf("/dash/analytics")!=-1?
                            <Link to="/dash/analytics" style={dupPicBoxStyle}><i className="fi fi-rr-chart-pie-alt"></i></Link>
                            :<Link to="/dash/analytics" style={dupPicBoxStyle}><i className="fi fi-rr-chart-pie-alt inactive"></i></Link>}
                        </li>
                        <li className="listitem-6">
                            {link.indexOf("/dash/earnings")!=-1?
                            <Link to="/dash/earnings" style={dupPicBoxStyle}><i className="fi fi-rr-money"></i></Link>
                            :<Link to="/dash/earnings" style={dupPicBoxStyle}><i className="fi fi-rr-money inactive"></i></Link>}
                        </li>
                    </ul>
                </div>
                <div className="section-2">
                    <Route exact path={`${path}`}><WelcomeDash/></Route>
                    <Route exact path={`${path}/home`}><DashHome data={user}/></Route>
                    <Route path={`${path}/blogs`}><DashBlogs selected={selected} setselected={setselected}/></Route>
                    <Route exact path={`${path}/analytics`}><DashAnalytics/></Route>
                    <Route exact path={`${path}/earnings`}><DashEarnings/></Route>
                    <Route exact path={`${path}/add-new-blog`}><DashAddNewBlog/></Route>
                    <Route exact path={`${path}/leaderboard`}><DashLeaderboard/></Route>
                </div>
                <div className="box-2">
                    <ProfileSideComponent/>
                </div> 
                </>:history.push("/login")}
            </div>
                {blogsBackdropParam?<Backdrop editbtn={true} data={selected} key={selected.id}/>:null}
                {addBackdropParam?<Backdrop editbtn={false} data={selected} key={selected.id}/>:null}
            </>
    )
}
