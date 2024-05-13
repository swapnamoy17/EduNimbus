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

const enrollinCourse = async(courseId, userId) => {
  return makeApiCall({
    method: 'post',
    url: '/enroll', 
    params: {user_id: userId, course_id: courseId},// Adjust to the correct endpoint
     // Include the new course data in the request body
  }, courseApiClient);
};

const addNewCourse = async (courseData) => {
    return makeApiCall({
      method: 'post',
      url: '/', // Adjust to the correct endpoint
      data: courseData // Include the new course data in the request body
    }, courseApiClient);
  };

const searchCourses = async (query, type, userId) => {
  return makeApiCall({
    method: 'get',
    url: '/recommended', 
    params: { query: query, type: type, userId: userId }, // Include the new course data in the request body
  }, courseApiClient);
}

export { getCoursesForUser, addNewCourse, enrollinCourse, searchCourses };
