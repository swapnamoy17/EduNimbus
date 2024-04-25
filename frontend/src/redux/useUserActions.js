import { useDispatch } from 'react-redux';
import { setUser, setUserGroups, setIdToken } from './action';

export const useUserActions = () => {
  const dispatch = useDispatch();

  const updateUser = (user) => {
    dispatch(setUser(user));
  };

  const updateUserGroups = (groups) => {
    dispatch(setUserGroups(groups));
  };

  const updateIdToken = (token) => {
    dispatch(setIdToken(token));
  };

  return { updateUser, updateUserGroups, updateIdToken };
};
