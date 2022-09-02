import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            history.push("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <div className="login_container">
        <div className="login_form_container">
            <div className="right">
                <form  onSubmit={Auth}  className="form_container" >
                    <h1 style={{color:"black",margin:"25px"}}>Login to Your Account</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input"
                    />
                    {msg && <div className="error_msg">{msg}</div>}
                    <button type="submit" className="green_btn">
                        Sing In
                    </button>
                </form>
            </div>
            <div className="left ">
                <h1>New Here ?</h1>
                <a href="/register">
                    <button type="button" className="white_btn">
                        Sing Up
                    </button>
                </a>
            </div>
        </div>
    </div>
    )
}

export default Login
