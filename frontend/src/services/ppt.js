import makeApiCall from './apiService';
import { PPTApiClient, PPTInstApiClient, PPTSingleApiClient } from './apiClient';

const getPPTsForVideo = async (videoId) => {
    return makeApiCall({
      method: 'get',
      url: '',
      params: { videoId: videoId },
      body: ''
    }, PPTApiClient);
  };

const addNewPPT = async (pptName, selectedVideos) => {
    return makeApiCall({
      method: 'post',
      url: '/',
      data: {
        name: pptName,
        video_ids: selectedVideos.map(id => ({ id }))
        },
    }, PPTApiClient);
  };

const getPPTsForCourse = async (courseId) => {
    return makeApiCall({
      method: 'get',
      url: '',
      params: { courseId: courseId },
      body: ''
    }, PPTInstApiClient);
  };

const getSinglePPT = async (pptId) => {
    return makeApiCall({
      method: 'get',
      url: '',
      params: { pptId: pptId },
      body: ''
    }, PPTSingleApiClient);
  };

export { getPPTsForVideo, addNewPPT, getPPTsForCourse, getSinglePPT };