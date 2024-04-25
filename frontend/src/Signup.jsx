import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {CognitoUserAttribute } from 'amazon-cognito-identity-js';

import userpool from './userpool';

const Signup = () => {

  const Navigate = useNavigate();

  const EMAIL = "Email"
  const PASSWORD = "Password"
  const ROLE = "Role"
  const STUDENT = "Student"
  const INSTRUCTOR = "Instructor"

  const EMAIL_REQUIRED = "Email is required."
  const PASSWORD_REQUIRED = "Password is required."
  const ROLE_REQUIRED = "Role is required"
  const PASSWORD_LENGTH_REQUIRED = "Password must be at least 6 characters."

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const formInputChange = (formField, value) => {
    if (formField === EMAIL) {
      setEmail(value);
    }
    if (formField === PASSWORD) {
      setPassword(value);
    } else if (formField === ROLE) {
      setRole(value);
    }
  };

  const validation = () => {
    return new Promise((resolve,reject)=>{
      if (email === '' && password === '') {
        setEmailErr(EMAIL_REQUIRED);
        setPasswordErr(PASSWORD_REQUIRED)
        resolve({email : EMAIL_REQUIRED, password : PASSWORD_REQUIRED});
      } else if (email === '') {
        setEmailErr(EMAIL_REQUIRED)
        resolve({email : EMAIL_REQUIRED, password:""});
      } else if (password === '') {
        setPasswordErr(PASSWORD_REQUIRED)
        resolve({email : "",password : PASSWORD_REQUIRED});
      } else if (password.length < 6) {
        setPasswordErr(PASSWORD_LENGTH_REQUIRED)
        resolve({email : "",password : PASSWORD_LENGTH_REQUIRED});
      } else if (!role) {
        reject({role: ROLE_REQUIRED});
      } else {
        resolve({email: "",password: "", role: ""});
      }
      reject('')
    });
  };

  const handleClick = (e) => {
    setEmailErr("");
    setPasswordErr("");
    validation()
      .then((res) => {
        if (res.email === '' && res.password === '' && res.role === '') {
          const attributeList = [];
          attributeList.push(
            new CognitoUserAttribute({
              Name: 'email',
              Value: email,
            }),
            new CognitoUserAttribute({
              Name: 'custom:Role',
              Value: role
            })
          );
          let username=email;
          userpool.signUp(username, password, attributeList, null, (err, data) => {
            if (err) {
              console.log(err);
              alert("Couldn't sign up - " + err.message);
            } else {
              console.log('User Added Successfully: ', data);
              alert('User Added Successfully');
              Navigate('/dashboard');
            }
          });
        }
      }, err => console.log(err))
      .catch(err => console.log(err));
  }

  return (
    <div className="signup">

      <div className='form'>
        <div className="formfield">
          <input
            value={email}
            onChange={(e) => formInputChange(EMAIL, e.target.value)}
            label = {EMAIL}
            placeholder = {EMAIL}
          />
          <div>{emailErr}</div>
        </div>
        <div className='formfield'>
          <input
            value={password}
            onChange={(e) => { formInputChange(PASSWORD, e.target.value) }}
            type = {PASSWORD}
            label = {PASSWORD}
            placeholder = {PASSWORD}
          />
          <div>{passwordErr}</div>
        </div>
        <div className='formfield'>
          <label><input type="radio" value = {STUDENT} checked={role === STUDENT} onChange={(e) => formInputChange(ROLE, e.target.value)} /> {STUDENT} </label>
          <label><input type="radio" value = {INSTRUCTOR} checked={role === INSTRUCTOR} onChange={(e) => formInputChange(ROLE, e.target.value)} /> {INSTRUCTOR} </label>
        </div>
        <div className='formfield'>
          <button type='submit' variant='contained' onClick={handleClick}>Signup</button>
        </div>
      </div>

    </div>
  )
}

export default Signup
