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

const addNewCourse = async (courseData) => {
    return makeApiCall({
      method: 'post',
      url: '/', // Adjust to the correct endpoint
      data: courseData // Include the new course data in the request body
    }, courseApiClient);
  };

export { getCoursesForUser, addNewCourse};