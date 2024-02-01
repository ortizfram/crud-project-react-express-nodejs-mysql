import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/students")
      .then(() => {
        setData((res)=>res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
  <div className="container-fluid bg-primary vh-100 vw-100">
    <h3>Students</h3>
    <div className="d-flex justify-content-end">
      <Link className="btn btn-success" to='/create'>Add student</Link>
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((student)=>{
            return(
              <tr>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>{student.gender}</td>
                <td>
                  <Link className="btn mx-2 btn-success" to={`/read/${student.id}`}>Read</Link>
                  <Link className="btn mx-2 btn-success" to={`/edit/${student.id}`}>Edit</Link>
                  <button className="btn mx-2 btn-danger">Delete</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
    </div>
  );
}

export default Home;
