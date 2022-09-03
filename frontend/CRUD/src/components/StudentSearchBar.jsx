import React,{ useState,useEffect} from "react";
import StudentTable from './StudentTable';
import axios from "axios";
import jwt_decode from "jwt-decode";


export default function StudentSearchBar() {
  const [student, setStudent] = useState([]);
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [query, setQuery] = useState("");
  useEffect(() => {
    GetStudents();
  }, []);
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

  const GetStudents = async () => {
      const response = await axiosJWT.get('http://localhost:5000/students', {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      setStudent(response.data);
  }
  //  const GetStudents = async () => {
  //   const response = await axios.get("http://localhost:5000/students");
  //   console.log(response.data)
  //   setStudent(response.data);

  // };
  const keys = [ "name", "email","password"];
  const Search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };
return (
  <div >
      <input
        style={{padding:"5px",borderRadius:"15px",marginBottom:"5px",width:"300px"}}
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
    {<StudentTable data={Search(student)} />}
  </div>
);
}
