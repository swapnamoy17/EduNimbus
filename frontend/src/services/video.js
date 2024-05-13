import makeApiCall from './apiService';
import { videoApiClient } from './apiClient';
import { videoAPiClientUplaod } from './apiClient';
import axios from 'axios';

const getVideosForCourse = async (courseId) => {
  return makeApiCall({
    method: 'get',
    url: '',
    params: { courseId: courseId },
    body: ''
  }, videoApiClient);
};

const uploadVideo = async (courseId, file, videoName) => {
  const timestamp = new Date().getTime();
  const objectName = `${courseId}_video_${timestamp}`;

  try {
    // Fetch the pre-signed URL using the apiCall function
    const presignedUrlResponse = await makeApiCall({
      method: 'post',
      url: '',
      data: {},
      params: {video_name: videoName, object_name: objectName},
      headers: {}
    }, videoAPiClientUplaod);

    if (!presignedUrlResponse || !presignedUrlResponse.upload_url) {
      throw new Error('Failed to obtain pre-signed URL');
    }

    const preSignedUrl = presignedUrlResponse.upload_url;
    console.log(preSignedUrl);

    // Perform the upload using the fetched pre-signed URL
    const uploadResponse = await axios.put(preSignedUrl, file, {
      headers: {
        'Content-Type': 'video/mp4' // Ensure this matches the type expected by S3 presigned URL
      }
    });

    if (uploadResponse.status !== 200) {
      throw new Error('Failed to upload video to S3');
    }

    console.log('Upload successful:', uploadResponse.data);
    return uploadResponse.data; // Or return a custom object/message as needed
  } catch (error) {
    console.error('Upload failed:', error);
    throw error; // Re-throw to allow the caller to handle the error
  }
};

const streamVideo = async (videoId) => {
    return makeApiCall({
        method: 'get',
        url: '/stream',
        params: { videoId: videoId },
        body: ''
    }, videoApiClient);
}

export { getVideosForCourse, uploadVideo, streamVideo };
