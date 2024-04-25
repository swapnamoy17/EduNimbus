import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authenticate } from './authenticate';

const LoginPage = ({ setUserGroups, setUser }) => {

  const NEW_PASSWORD_REQUIRED = "New password required"

  const Navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [loginErr,setLoginErr]=useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordErr, setNewPasswordErr] = useState('');
  const [cognitoUser, setCognitoUser] = useState(null);

  const formInputChange = (formField, value) => {
    if (formField === "email") {
      setEmail(value);
    }
    if (formField === "password") {
      setPassword(value);
    }
    if (formField === "newPassword") {
        setNewPassword(value);
    }
  };

  const validation = () => {
    return new Promise((resolve, reject) => {
      if (email === '' && password === '') {
        setEmailErr("Email is Required");
        setPasswordErr("Password is required")
        resolve({ email: "Email is Required", password: "Password is required" });
      }
      else if (email === '') {
        setEmailErr("Email is Required")
        resolve({ email: "Email is Required", password: "" });
      }
      else if (password === '') {
        setPasswordErr("Password is required")
        resolve({ email: "", password: "Password is required" });
      }
      else if (password.length < 6) {
        setPasswordErr("must be 6 character")
        resolve({ email: "", password: "must be 6 character" });
      }
      else {
        resolve({ email: "", password: "" });
      }
    });
  };

  const handleNewPassword = () => {
    if (newPassword.length < 6) {
        setNewPasswordErr('Password must be at least 6 characters');
        return;
    }
    if (cognitoUser && cognitoUser.completeNewPasswordChallenge) {
        cognitoUser.completeNewPasswordChallenge(newPassword, {}, {
            onSuccess: (result) => {
                Navigate('/dashboard');
            },
            onFailure: (err) => {
                setLoginErr(err.message || 'Failed to set new password.');
            }
        });
    } else {
        setLoginErr('User session not available. Please try logging in again.');
    }
  };

  const handleClick = () => {
    setEmailErr("");
    setPasswordErr("");
    setNewPasswordErr("");
    setLoginErr("");
    validation()
        .then((res) => {
            if (res.email === '' && res.password === '') {
                authenticate(email, password)
                    .then(({ groups, user, userAttributes, requiredAttributes, newPasswordRequired }) => {
                        if (newPasswordRequired) {
                            setCognitoUser(user);
                            setLoginErr(NEW_PASSWORD_REQUIRED);
                        } else {
                            setLoginErr('');
                            setUserGroups(groups);
                            console.log("User groups: ", groups);
                            Navigate('/dashboard');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        setLoginErr(err.message);
                    });
            }
        })
        .catch(err => console.log(err));
    };

  return (
    <div className="login">
      <div className='form'>
        <div className="formfield">
          <input
            value={email}
            onChange={(e) => formInputChange("email", e.target.value)}
            label="Email"
            helperText={emailErr}
          />
          <div>{emailErr}</div>
        </div>
        <div className='formfield'>
          <input
            value={password}
            onChange={(e) => { formInputChange("password", e.target.value) }}
            type="password"
            label="Password"
            helperText={passwordErr}
          />
          <div>{passwordErr}</div>
        </div>
        {loginErr === NEW_PASSWORD_REQUIRED && (
          <div className='formfield'>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => formInputChange("newPassword", e.target.value)}
              placeholder="New Password"
            />
            <div>{newPasswordErr}</div>
            <button onClick={handleNewPassword}>Set New Password</button>
          </div>
        )}
        {loginErr !== NEW_PASSWORD_REQUIRED && 
          <div className='formfield'>
            <button type='submit' variant='contained' onClick={handleClick}>Login</button>
          </div>
        }
        <div>{loginErr}</div>
      </div>

    </div>
  )
}

export default LoginPage
