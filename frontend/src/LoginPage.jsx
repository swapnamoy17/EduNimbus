import React, { useEffect } from 'react';

function LoginPage() {
  useEffect(() => {
    // Construct the Hosted UI URL
    const domain = process.env.REACT_APP_COGNITO_DOMAIN; // Replace with your actual domain
    const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID; // Replace with your actual client ID
    const responseType = 'code'; // You can use 'code' for authorization code grant flow
    const redirectUri = encodeURIComponent('http://localhost:3000/');
    const scope = encodeURIComponent('openid email'); 

    const loginUrl = `https://${domain}/login?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    // Redirect to the Hosted UI
    window.location.href = loginUrl;
  }, []);

  return (
    <div>Loading...</div>
  );
}

export default LoginPage;
