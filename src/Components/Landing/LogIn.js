import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserData } from './API/GetUser';
const API = process.env.REACT_APP_API_URL;


function LogIn( { updateData } ) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const logInUser = (existingUser) => {
    axios
      .post(`${API}/login`, existingUser)
      .then(
      (res) => {
        updateData(res.data)
        navigate(`/search`);
      })
      .catch((c) => {
        console.error("catch", c)
      });
  };



    // If email was previouls used, it will not work
  const handleTextChange = (event) => {
      setUser({ ...user, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      logInUser(user)
  };

  return (
    <div className="wrapper">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <label htmlFor="email">Email: </label>
          <input
          id="email" 
          type="email" 
          value={user.email}
          onChange={handleTextChange}
          className="form-control" 
          placeholder="email:"
          required
          />
        </div>
          <br></br>
        <div className="input-box">
          <label className="form-check-label" htmlFor="password">Password: </label>
          <input 
          id="password"
          type="password" 
          value={user.password}
          onChange={handleTextChange}
          className="form-check-input" 
          />
        </div>
          <br></br>
        <div className="input-box button">
          <input type="submit" />
        </div>
      </form>
      <div className="text">
          <h3>Dont Have An Account? <a href="/register">Register</a></h3>
        </div>
    </div>
  )
}

export default LogIn