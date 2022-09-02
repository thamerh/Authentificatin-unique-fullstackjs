import React, { useState } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";
import './register.css'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();

    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            history.push("/login");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (

        <div className="signup_container">
        <div className="signup_form_container">
            <div className="left">
                <h1>Welcome Back</h1>
                <a href="/login">
                    <button type="button" className="white_btn">
                        Sing in
                    </button>
                </a>
            </div>
            <div className="right">
                <form className="form_container" onSubmit={Register}  >
                    <h1 style={{color:"black", margin:"25px"}}>Create Account</h1>
                    <input
                        type="text"
                        placeholder="Name"
                        name="Name"
                        value={name} onChange={(e) => setName(e.target.value)} 
                        required
                        className="input"
                    />
                    
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input"
                    />
                    <input
                        type="password"
                        placeholder="ConfPassword"
                        name="confPassword"
                        value={confPassword} onChange={(e) => setConfPassword(e.target.value)}
                        required
                        className="input"
                    />
                    {msg && <div className="error_msg">{msg}</div>}
                    <button type="submit" className="green_btn">
                        Sing Up
                    </button>
                </form>
            </div>
        </div>
    </div>

    )
}

export default Register
