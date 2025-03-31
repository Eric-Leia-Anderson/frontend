import React from 'react';
import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
//better errors needed
//sessions management for login
const LoginPage = () =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState(false);
    var login = false;
    var loginError = false;
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(email);
      console.log(password);
      fetch('http://localhost:8080/login/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'accept-encoding': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({name: email, pass: password})})
      .then(response => {
        if(!response.ok) {
          throw new Error(response.status);
        } else {
        return response.json();
      }})
      .then(data => {
        login = true;
        console.log("SUCCESS");
        loginError = false;
        navigate('/');//here I do something like",{state: {name: data.username}}"
    })
      .catch(error => {
        console.error('Error fetching the user: ', error);
        console.log(email);
        loginError = true;
        console.log("error: ", error);
        setError(error.message);
      }); 
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      {error && (<div>
        <h3 style={{color: 'red'}}>Error logging in!</h3>
        <p style={{color: 'red'}}>Please try again.</p>
     </div>)}
      <button onClick={handleSubmit}>Log in</button>
     
    </form>
    
    );
}

export default LoginPage