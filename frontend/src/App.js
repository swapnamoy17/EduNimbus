import React from 'react';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import StudentDashboard from './StudentDashboard';
import InstructorDashboard from './InstructorDashboard';
import LoginPage from './LoginPage';

// Your Cognito User Pool Data
const poolData = {
  UserPoolId: 'your-user-pool-id',
  ClientId: 'your-client-id'
};

const userPool = new CognitoUserPool(poolData);

function App() {
  const [user, setUser] = React.useState(null);

  // Check the user's session when the component mounts
  React.useEffect(() => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.error(err);
          return;
        }
        setUser(cognitoUser);
      });
    }
  }, []);

  const handleLogout = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      setUser(null);
    }
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          {/* Routes go here */}
          <Route path="/login">
            <LoginPage userPool={userPool} setUser={setUser} />
          </Route>
          <Route path="/student-dashboard">
            {user ? <StudentDashboard onLogout={handleLogout} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/instructor-dashboard">
            {user ? <InstructorDashboard onLogout={handleLogout} /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
