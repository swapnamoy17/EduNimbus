import axios from 'axios';

const videoApiClient = axios.create({
  baseURL: process.env.REACT_APP_VIDEO_GATEWAY_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  }
});

videoApiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log("videoAPIClient - token: ", token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

const videoAPiClientUplaod = axios.create({
  baseURL: process.env.REACT_APP_VIDEO_UPLOAD_GATEWAY_ENDPOINT
});

videoAPiClientUplaod.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log("videoAPIClientUpload - token: ", token);
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Set default Content-Type to 'application/json' unless explicitly defined in the request
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';
    console.log(config);
    return config;
}, (error) => {
    return Promise.reject(error);
});

const courseApiClient = axios.create({
  baseURL: process.env.REACT_APP_COURSE_GATEWAY_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  }
});

courseApiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log("courseAPIClient - token: ", token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
export { videoApiClient }
export { courseApiClient }
export { videoAPiClientUplaod }