import makeApiCall from './apiService';
import { courseApiClient } from './apiClient';

const getCoursesForUser = async (userId) => {
  return makeApiCall({
    method: 'get',
    url: '/',
    params: { userId: userId },
    body: ''
  }, courseApiClient);
};

export { getCoursesForUser };