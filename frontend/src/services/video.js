import makeApiCall from './apiService';
import { videoApiClient } from './apiClient';

const getVideosForCourse = async (courseId) => {
  return makeApiCall({
    method: 'get',
    url: '',
    params: { courseId: courseId },
    body: ''
  }, videoApiClient);
};

export { getVideosForCourse };
