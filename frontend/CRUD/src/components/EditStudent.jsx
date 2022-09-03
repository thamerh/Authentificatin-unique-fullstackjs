import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const EditUser = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    refreshToken();
}, []);
useEffect(() => {
  getUserById();
}, [token]);
const refreshToken = async () => {
    try {
        const response = await axios.get('http://localhost:5000/token');
        setToken(response.data.accessToken);
    } catch (error) {
        if (error.response) {
            // history.push("/");
            window.location = "/login";
        }
    }
}

const axiosJWT = axios.create();
 
axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get('http://localhost:5000/token');
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/students/${id}`, {  
        name,
        email,
        password
      });
     history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/students/${id}`,{
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
  
    setName(response.data.name);
    setEmail(response.data.email);
    setPassword(response.data.password);
    
  };

  return (
    <section className=" is-fullheight is-fullwidth "  >
    <div className="container height p-6 m-6 ">
        <div className="columns is-centered ">
            <div className="column is-4-desktop ">
            <h1 style={{textAlign:"center",  fontSize: "30px",padding: "10px",color: "black",fontFamily: 'Pacifico'}}> Update student</h1>
              <form onSubmit={updateUser} className='w-100 col-md-6 className="box  p-4"' >
                <div className="field">
               <label className="label">Name</label>
                <div className="control">
                <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">password</label>
            <div className="control">
            <input
                type="text"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-small is-info mr-2">
            Update
            </button>
          </div>
        </form>                    
            
            </div>
        </div>
    </div>

</section>
    
  );
};

export default EditUser;
