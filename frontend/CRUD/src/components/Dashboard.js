/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const history = useHistory();

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                // history.push("/");
                window.location = "/login";
            }
        }
    }

    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            // history.push("/");
            window.location = "/login";
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mt-5">
            <h1>Welcome Back: {name}</h1>
            <div className="buttons">
                                <button onClick={Logout} >
                                    Log Out
                                </button>
                            </div>
        </div>
    )
}

export default Dashboard
