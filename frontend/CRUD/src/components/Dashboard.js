import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { Link,useHistory} from "react-router-dom";
import StudentSearchBar from "./StudentSearchBar";

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
        <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
  <h1>Welcome : {name}</h1>
  </div>

  
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
        <button onClick={Logout} className="button is-small is-info mr-2">
                                    Log Out
                                </button>
          <Link    to={`AddStudent`}
                className="button is-small is-info mr-2">
                Add student
              </Link>
        </div>
      </div>
    </div>
 
</nav>
<div className=" mt-5 is-centered w-100" >
      <div className="column w-100"  >
        <h1 style={{textAlign:"center",  fontSize: "25px",padding: "10px",color: "rgb(22, 134, 240)",fontFamily: 'Pacifico'}}> students </h1>
        <span  style={{textAlign:"center"}}><StudentSearchBar/></span>
      </div>
    </div>
        </div>
    )
}

export default Dashboard
