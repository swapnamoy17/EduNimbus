import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authenticate } from './authenticate';
import './LoginPage.css';
import { useUserActions } from './redux/useUserActions';

const LoginPage = () => {

  const EMAIL = "Email"
  const PASSWORD = "Password"
  const NEW_PASSWORD = "New Password"
  const EMAIL_REQUIRED = "Email is required"
  const PASSWORD_REQUIRED = "Password is required"
  const PASSWORD_LENGTH_REQUIRED = "Password must be at least 6 characters"
  const NEW_PASSWORD_REQUIRED = "New password required"
  const ROLE_NOT_ASSIGNED = "Role not assigned"

  const Navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [loginErr,setLoginErr]=useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordErr, setNewPasswordErr] = useState('');
  const [cognitoUser, setCognitoUser] = useState(null);
  const { updateUser, updateUserGroups, updateIdToken } = useUserActions();

  const formInputChange = (formField, value) => {
    if (formField === EMAIL) {
      setEmail(value);
    }
    if (formField === PASSWORD) {
      setPassword(value);
    }
    if (formField === NEW_PASSWORD) {
        setNewPassword(value);
    }
  };

  const validation = () => {
    return new Promise((resolve, reject) => {
      if (email === '' && password === '') {
        setEmailErr(EMAIL_REQUIRED);
        setPasswordErr(PASSWORD_REQUIRED)
        resolve({ email: EMAIL_REQUIRED, password: PASSWORD_REQUIRED });
      }
      else if (email === '') {
        setEmailErr(EMAIL_REQUIRED)
        resolve({ email: EMAIL_REQUIRED, password: "" });
      }
      else if (password === '') {
        setPasswordErr(PASSWORD_REQUIRED)
        resolve({ email: "", password: PASSWORD_REQUIRED });
      }
      else if (password.length < 6) {
        setPasswordErr(PASSWORD_LENGTH_REQUIRED)
        resolve({ email: "", password: PASSWORD_LENGTH_REQUIRED });
      }
      else {
        resolve({ email: "", password: "" });
      }
    });
  };

  const handleNewPassword = () => {
    if (newPassword.length < 6) {
        setNewPasswordErr(PASSWORD_LENGTH_REQUIRED);
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
                    .then(({ groups, user, decodedToken, userAttributes, requiredAttributes, newPasswordRequired }) => {
                        if (newPasswordRequired) {
                            setCognitoUser(user);
                            setLoginErr(NEW_PASSWORD_REQUIRED);
                        } else if (!groups || groups.length === 0) {
                            console.log("User authentication successful but no role assigned.")
                            setLoginErr(ROLE_NOT_ASSIGNED)
                        } else {
                            setLoginErr('');
                            updateUser(user);
                            updateUserGroups(groups);
                            updateIdToken(decodedToken)
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
        <div className="header-logo">
          <img src="/edu-nimbus.png" alt="EduNimbus Logo" /> {/* Adjust the src as needed */}
          <span className="header-title">EduNimbus</span>
        </div>
        <div className="formfield">
          <input
            value={email}
            onChange={(e) => formInputChange(EMAIL, e.target.value)}
            label={EMAIL}
            placeholder={EMAIL}
          />
          <div className="error-message">{emailErr}</div>
        </div>
        <div className='formfield'>
          <input
            value={password}
            onChange={(e) => { formInputChange(PASSWORD, e.target.value) }}
            type={PASSWORD}
            label={PASSWORD}
            placeholder={PASSWORD}
          />
          <div className="error-message">{passwordErr}</div>
        </div>
        {loginErr === NEW_PASSWORD_REQUIRED && (
          <div className='formfield'>
            <input
              type={PASSWORD}
              value={newPassword}
              onChange={(e) => formInputChange(NEW_PASSWORD, e.target.value)}
              placeholder={NEW_PASSWORD}
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
        <div className="error-message">{loginErr}</div>
      </div>

    </div>
  )
}

export default LoginPage
