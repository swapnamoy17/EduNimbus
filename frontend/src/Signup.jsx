import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {CognitoUserAttribute } from 'amazon-cognito-identity-js';

import userpool from './userpool';

const Signup = () => {

  const Navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const formInputChange = (formField, value) => {
    if (formField === "email") {
      setEmail(value);
    }
    if (formField === "password") {
      setPassword(value);
    } else if (formField === "role") {
      setRole(value);
    }
  };

  const validation = () => {
    return new Promise((resolve,reject)=>{
      if (email === '' && password === '') {
        setEmailErr("Email is Required");
        setPasswordErr("Password is required")
        resolve({email:"Email is Required",password:"Password is required"});
      } else if (email === '') {
        setEmailErr("Email is Required")
        resolve({email:"Email is Required",password:""});
      } else if (password === '') {
        setPasswordErr("Password is required")
        resolve({email:"",password:"Password is required"});
      } else if (password.length < 6) {
        setPasswordErr("must be 6 character")
        resolve({email:"",password:"must be 6 character"});
      } else if (!role) {
        reject({role: "Role is required"});
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
            onChange={(e) => formInputChange("email", e.target.value)}
            label="Email"
            helperText={emailErr}
          />
        </div>
        <div className='formfield'>
          <input
            value={password}
            onChange={(e) => { formInputChange("password", e.target.value) }}
            type="password"
            label="Password"
            helperText={passwordErr}
          />
        </div>
        <div className='formfield'>
          <label><input type="radio" value="Student" checked={role === 'Student'} onChange={(e) => formInputChange("role", e.target.value)} /> Student</label>
          <label><input type="radio" value="Instructor" checked={role === 'Instructor'} onChange={(e) => formInputChange("role", e.target.value)} /> Instructor</label>
        </div>
        <div className='formfield'>
          <button type='submit' variant='contained' onClick={handleClick}>Signup</button>
        </div>
      </div>

    </div>
  )
}

export default Signup
