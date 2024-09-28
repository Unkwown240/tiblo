import React, {useEffect} from 'react';
import ButtonComp from './ButtonComp';
import ProfileSideComponent from './ProfileSideComponent';

export default function DashLeaderboard() {
    // useEffect(() => {
    //     document.getElementById('allBtn').focus();
    // })
    
    return (
        <div className="cont">
            <div className="box-1">
                <h2>Dash-Leaderboard</h2>
                <div className="category-boxes">
                    <button className="box active">All</button>
                    <button className="box">News</button>
                    <button className="box">Science</button>
                    <button className="box">Sports</button>
                    <button className="box">Food</button>
                    <button className="box">Travel</button>
                    <button className="box">Business</button>
                    <button className="box">Personal</button>
                    <button className="box">Tutorial</button>
                    <button className="box">Other</button>
                </div>
                <div className="leaderboard-box">
                    <div className="leaderboard-heads">
                        <h4>Rank</h4>
                        <h4>Blogger</h4>
                        <h4>Blogs-written</h4>
                        <h4>Followers</h4>
                        <h4>Topic</h4>  
                    </div>
                    <div className="leaderboard success">
                        <h3 className="title">New Blog Created (tut-2 java tutorial) as Draft</h3>
                    </div>
                </div>
            </div>
                        
        </div>
    )
}
