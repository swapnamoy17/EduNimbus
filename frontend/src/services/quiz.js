import makeApiCall from './apiService';
import { quizApiClient } from './apiClient';
import { quizAPiClientUplaod } from './apiClient';
import { quizInstApiClient } from './apiClient';
import { quizSingleApiClient } from './apiClient';

const getQuizesForVideo = async (videoId) => {
    return makeApiCall({
      method: 'get',
      url: '',
      params: { videoId: videoId },
      body: ''
    }, quizApiClient);
  };

  const addNewQuiz = async (quizName, selectedVideos) => {
    return makeApiCall({
      method: 'post',
      url: '/',
      data: {
        name: quizName,
        video_ids: selectedVideos.map(id => ({ id }))
        },
    }, quizApiClient);
  };

const getQuizesForCourse = async (courseId) => {
    return makeApiCall({
      method: 'get',
      url: '',
      params: { courseId: courseId },
      body: ''
    }, quizInstApiClient);
  };

const getSingleQuize = async (quizId) => {
    return makeApiCall({
      method: 'get',
      url: '',
      params: { quizId: quizId },
      body: ''
    }, quizSingleApiClient);
  };

// const uploadQuiz = async (quizName, selectedVideos) => {
//     const timestamp = new Date().getTime();
//     const objectName = `${courseId}_video_${timestamp}`;
  
//     try {
//       // Fetch the pre-signed URL using the apiCall function
//       const presignedUrlResponse = await makeApiCall({
//         method: 'post',
//         url: '',
//         data: {},
//         params: {video_name: videoName, object_name: objectName},
//         body: {
//             name: quizName,
//             video_ids: selectedVideos.map(id => ({ id }))
//         },
//         headers: {}
//       }, quizAPiClientUplaod);
  
//       if (!presignedUrlResponse || !presignedUrlResponse.upload_url) {
//         throw new Error('Failed to obtain pre-signed URL');
//       }
  
//       const preSignedUrl = presignedUrlResponse.upload_url;
//       console.log(preSignedUrl);
  
//       // Perform the upload using the fetched pre-signed URL
//       const uploadResponse = await axios.put(preSignedUrl, file, {
//         headers: {
//           'Content-Type': 'video/mp4' // Ensure this matches the type expected by S3 presigned URL
//         }
//       });
  
//       if (uploadResponse.status !== 200) {
//         throw new Error('Failed to upload video to S3');
//       }
  
//       console.log('Upload successful:', uploadResponse.data);
//       return uploadResponse.data; // Or return a custom object/message as needed
//     } catch (error) {
//       console.error('Upload failed:', error);
//       throw error; // Re-throw to allow the caller to handle the error
//     }
//   };


export { getQuizesForVideo, addNewQuiz, getQuizesForCourse, getSingleQuize };