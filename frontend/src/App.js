import React from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import StudentDashboard from './StudentDashboard';
import InstructorDashboard from './InstructorDashboard';
import LoginPage from './LoginPage';

const poolData = {
  UserPoolId: 'your-user-pool-id',
  ClientId: 'your-app-client-id'
};

const userPool = new CognitoUserPool(poolData);

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession((err, session) => {
        if (session && session.isValid()) {
          setUser(currentUser);
        } else {
          setUser(null);
        }
      });
    }
  }, []);

  const handleLogout = () => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
      setUser(null);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/student-dashboard" element={user ? <StudentDashboard onLogout={handleLogout} /> : <Navigate replace to="/login" />} />
          <Route path="/instructor-dashboard" element={user ? <InstructorDashboard onLogout={handleLogout} /> : <Navigate replace to="/login" />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
