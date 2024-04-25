import { useSelector } from 'react-redux';

export const useUserState = () => {
  const user = useSelector(state => state.userState.user);
  const userGroups = useSelector(state => state.userState.userGroups);
  const idToken = useSelector(state => state.userState.idToken);

  return { user, userGroups, idToken };
};
