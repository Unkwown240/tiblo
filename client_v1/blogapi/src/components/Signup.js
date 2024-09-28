import React,{ useState } from 'react'
import { useHistory, Link } from 'react-router-dom';
import axiosObj from './axios';

export default function Signup() {
    const history = useHistory()
    const [email, setemail] = useState("");
    const [username, setusername] = useState("");
    const [about, setabout] = useState("");
    const [firstname, setfirstname] = useState("");
    const [password, setpassword] = useState("");
    const [passerr, setpasserr] = useState("");
    const handleEmailChange = e => setemail(e.target.value);
    const handleUsernameChange = e => setusername(e.target.value);
    const handleAboutChange = e => setabout(e.target.value);
    const handleFirstnameChange = e => setfirstname(e.target.value);
    const handlePasswordChange = e => setpassword(e.target.value);
    function validator() {
        var emailID = email
        let atpos = emailID.indexOf("@");
        let dotpos = emailID.lastIndexOf(".");
        if(username===""){ alert("Please enter username"); return false; }
        if (atpos < 1 || ( dotpos - atpos < 2 )) {
            alert("Please enter valid email ID")
            return false;
        }
        if(about===""){ alert("Please enter details for profile (about)"); return false; }
        if(password===""){ alert("Please enter Password"); return false; }
        if(firstname===""){ alert("Please enter First Name"); return false; }
        return( true );
     }
     function otherValidations(){
        if(password.length!==8){ setpasserr("Password should be of 8 characters"); return false; }
        return true;
     }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { "email": email, "user_name":username, "first_name":firstname, "about": about, "password": password }
        const loginData = { email, password }
        const val = validator()&&otherValidations();
        if(val){
            axiosObj.post("user/register/", data).then(res => {
                return axiosObj.post("token/", loginData)
            }).then(res => {
                localStorage.setItem("access", res.data.access)
                localStorage.setItem("refresh", res.data.refresh)
                localStorage.setItem("email", email)
                history.push("/dash")
            })
        }
    }

    return (
        <div className="backdrop">
            <div className='container flex center'>
            <div className="box-signup">
                <div className="row-signup">
                    <Link to="/" className="back">
                    </Link>
                    <h2 className="text">Sign-up</h2>
                </div>
                    <div className="row-signup">
                        <input className='signup' onChange={handleUsernameChange} value={username} placeholder='User-name' type="text" name="username" required/>
                    </div>
                    <div className="row-signup">
                        <input className='signup' onChange={handleFirstnameChange} value={firstname} placeholder='First-name' type="text" name="fn" required/>
                    </div>
                    <div className="row-signup">
                        <input className='signup' onChange={handleEmailChange} value={email} placeholder='E-mail' type="email" name="email" required/>
                    </div>
                    <div className="row-signup">
                        <input className='signup' onChange={handleAboutChange} value={about} placeholder='About' type="text" name="about" required/>
                    </div>
                    <div className="row-signup">
                        <input className='signup' onChange={handlePasswordChange} value={password} placeholder='Pass-word' type="password" name="password" required/>
                        <label htmlFor="inp4">{passerr}</label>
                    </div>
                    <div className="row-login">
                        <button type='submit' onClick={handleSubmit} className='login'>Submit</button>
                    </div>
            </div>
        </div>
    </div>
    )
}
