import React, { useState} from "react";
import axios from "axios";
import { Link,useHistory} from "react-router-dom";
import StudentSearchBar from "./StudentSearchBar"
const StudentTable = ({ data }) => {
    const [chefusers, setChef] = useState([]);
   const history=useHistory();

   
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/students/${id}`);
      history.push("/");
    
    } catch (error) {
      console.log(error);
    }
  };

    return (
      <table className="table ">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>PASSWORD</th>
          
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td>
              <Link
                to={`editStudent/${user.id}`}
                className="button is-small is-info mr-2"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteUser(user.id)}
                className="button is-small is-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    );
  };
  
  export default StudentTable;