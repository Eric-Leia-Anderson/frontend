
import './App.css';
import React, {useEffect, useState} from 'react';
// eslint-disable-next-line
import ReactDOM from 'react-dom';
import { useNavigate, Link } from "react-dom"

function Login(username, password) {
  const requestBody = {name: 'admin', pass: 'foo'};
  const requestBody2 = {name: username, pass: password};
  console.log(requestBody);
  console.log(requestBody2);
  useEffect(() => {
      fetch('http://localhost:8080/login/check', {
        method: 'POST',
        body: JSON.stringify({name: username, pass: password})})
      .then(response => response.json)
      .then(data => {
        console.log(data)})
      .catch(error => console.error('Error fetching the user: ', error));
  }, []);
  return (
    <p>You did it!</p>
  );
};

export default Login;
