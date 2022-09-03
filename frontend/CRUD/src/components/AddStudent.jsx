import React, { useState ,useEffect} from 'react'
import axios from "axios";
import { useHistory,Link } from 'react-router-dom';

const AddStudent= () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();
    useEffect(() => {
        refreshToken();
    }, []);

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

    const RegisterAdmin= async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/students', {
                name: name,
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
        <section className=" is-fullheight is-fullwidth "  >
                <div className="container height p-6 m-6 ">
                    <div className="columns is-centered ">
                        <div className="column is-4-desktop ">
                            <form onSubmit={RegisterAdmin} className="box  p-4">
                            <h1 className="has-text-centered  google-font">Add student</h1>
                              
                                <div className="field ">
                                    <label className="label">Name</label>
                                    
                                        <input type="text" className="input is-rounded" placeholder="Name"
                                            value={name} onChange={(e) => setName(e.target.value)} />
                                    
                                </div>
                                <div className="field ">
                                    <label className="label">Email</label>
                                
                                        <input type="text" className="input is-rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                
                                </div>
                                
                                <div className="field ">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input is-rounded" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field ">
                                    <button className="button is-info is-rounded is-fullwidth">Add student</button>
                                </div>                               
                            </form>
                        </div>
                    </div>
                </div>
         
        </section>
    )
}

export default AddStudent;
