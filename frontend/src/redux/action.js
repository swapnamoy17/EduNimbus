export const setUser = user => ({
    type: 'SET_USER',
    payload: user,
  });
  
  export const setUserGroups = groups => ({
    type: 'SET_USER_GROUPS',
    payload: groups,
  });
  
  export const setIdToken = idToken => ({
    type: 'SET_ID_TOKEN',
    payload: idToken,
  });
  