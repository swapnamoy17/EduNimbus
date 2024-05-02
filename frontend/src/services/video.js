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

const streamVideo = async (videoId) => {
    return makeApiCall({
        method: 'get',
        url: '/stream',
        params: { videoId: videoId },
        body: ''
    }, videoApiClient);
}

export { getVideosForCourse, streamVideo };
