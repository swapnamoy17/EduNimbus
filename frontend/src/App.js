import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import StudentDashboard from './StudentDashboard';
import InstructorDashboard from './InstructorDashboard';
import InstructorCourse from './InstructorCourse';
import LoginPage from './LoginPage';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const handleAuthentication = async () => {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const domain = process.env.REACT_APP_COGNITO_DOMAIN;
      const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID; 
      const redirectUri = encodeURIComponent('http://localhost:3000/dashboard');
      const code = params.get('code');
      console.log("inside useeffect 1......params: ", params)
      if (code) {
        try {
          console.log("Inside useEffect try");
          const response = await fetch(`https://${domain}/oauth2/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=authorization_code&client_id=${clientId}&code=${code}&redirect_uri=${redirectUri}`
          });
          const data = await response.json();
          if (data.id_token) {
            const decoded = jwtDecode(data.id_token);
            setUser(decoded);
            setRole(decoded['cognito:groups'] && decoded['cognito:groups'][0]);
          }
        } catch (error) {
          console.error('Error exchanging code for tokens', error);
        }
      }
    };

    handleAuthentication();
  }, []);  // Consider what might require re-authentication or moving logic to a callable function.

  const getDashboard = () => {
    if (role === 'Instructors') {
      return <InstructorDashboard />;
    } else if (role === 'Students') {
      return <StudentDashboard />;
    } else {
      return <Navigate to="/" />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={user ? getDashboard() : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
