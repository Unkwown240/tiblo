import React,{ useState, useContext, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';
import { AppContext } from '../AppContext';
import axiosLoginObj from './axiosLogin'
import axiosObj from './axios';
import '../App.css'

export default function Login() {
    const history = useHistory()
    const { setuser } = useContext(AppContext)
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [passerr, setpasserr] = useState("");
    const handleEmailChange = e => setemail(e.target.value);
    const handlePasswordChange = e => setpassword(e.target.value);
    function validator() {
        var emailID = email
        let atpos = emailID.indexOf("@");
        let dotpos = emailID.lastIndexOf(".");
        if(email===""){ alert("Please enter Email"); return false; }
        if (atpos < 1 || ( dotpos - atpos < 2 )) {
            alert("Please enter valid email ID")
            return false;
        }
        if(password===""){ alert("Please enter Password"); return false; }
        if(password.length!==8){ setpasserr("Password should be of 8 characters"); return false; }
        return( true );
     }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { username: email, password, grant_type: "password", client_id: process.env.REACT_APP_CLIENT_ID
        , client_secret: process.env.REACT_APP_CLIENT_SECRET }
        const val = validator();
        if(val){
            axiosLoginObj.post("auth/token/", data).then(res => {
                localStorage.setItem("access", res.data.access_token)
                localStorage.setItem("refresh", res.data.refresh_token)
                return axiosObj.get(`id/${email}/`)
            }).then(res => {
                localStorage.setItem("id", res.data.id)
                history.push("/dash")
            })
        }
    }
    return (
        <div className='container flex center'>
            <div className="box-login">
                <div className="row-login">
                    <Link to="/" className="back">
                    </Link>
                    <h2 className="text">Log-in</h2>
                </div>
                <div className="row-login">
                        <input className='signup' onChange={handleEmailChange} value={email} placeholder='E-mail' type="email" name="email" required/>
                    </div>
                    <div className="row-login">
                        <input className='signup' onChange={handlePasswordChange} value={password} placeholder='Pass-word' type="password" name="password" required/>
                        <label htmlFor="inp4">{passerr}</label>
                    </div>
                <div className="row-login">
                    <button type='submit' onClick={handleSubmit} className='login' href="#">Login</button>
                </div>
            </div>
        </div>
    )
}
