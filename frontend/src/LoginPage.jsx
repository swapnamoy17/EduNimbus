import React, { useState } from 'react';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

function LoginPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const userPool = new CognitoUserPool({
    UserPoolId: 'your-user-pool-id',
    ClientId: 'your-app-client-id',
  });

  const onLogin = (event) => {
    event.preventDefault();

    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log('Login successful!', result);
        setUser(cognitoUser);
      },
      onFailure: (err) => {
        console.error('Login failed!', err);
      },
      newPasswordRequired: (userAttributes) => {
        // User needs to provide a new password and any required attributes here
        // This is common if the user is logging in for the first time
        console.log('New password required');
      },
    });
  };

  return (
    <div>
      <form onSubmit={onLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
