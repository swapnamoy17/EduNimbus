import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import userpool from './userpool';
import { jwtDecode } from 'jwt-decode';

export const authenticate = (Email, Password) => {
    return new Promise((resolve, reject) => {
        const user = new CognitoUser({
            Username: Email,
            Pool: userpool
        });

        const authDetails = new AuthenticationDetails({
            Username: Email,
            Password
        });

        user.authenticateUser(authDetails, {
            onSuccess: (result) => {
                console.log("login successful");
                const idToken = result.getIdToken().getJwtToken();
                const decodedToken = jwtDecode(idToken);
                const groups = decodedToken['custom:Role'] || [];
                resolve({ result, groups });  // Resolve both the auth result and the groups
            },
            onFailure: (err) => {
                console.log("login failed", err);
                reject(err);
            },
            newPasswordRequired: (userAttributes, requiredAttributes) => {
                resolve({ user, userAttributes, requiredAttributes, newPasswordRequired: true });
            }
        });
    });
};

export const logout = () => {
    const user = userpool.getCurrentUser();
    user.signOut();
    window.location.href = '/';
};