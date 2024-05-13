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

const quizApiClient = axios.create({
  baseURL: process.env.REACT_APP_QUIZ_GATEWAY_ENDPOINT_GET,
  headers: {
    'Content-Type': 'application/json'
  }
});

quizApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log("videoAPIClient - token: ", token);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const quizAPiClientUplaod = axios.create({
  baseURL: process.env.REACT_APP_QUIZ_GATEWAY_ENDPOINT_GET,
  headers: {
    'Content-Type': 'application/json'
  }
});

quizAPiClientUplaod.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log("quizAPIClientUpload - token: ", token);
    
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

const quizInstApiClient = axios.create({
  baseURL: process.env.REACT_APP_QUIZ_GATEWAY_ENDPOINT_INST_GET,
  headers: {
    'Content-Type': 'application/json'
  }
});

quizInstApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log("videoAPIClient - token: ", token);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const quizSingleApiClient = axios.create({
  baseURL: `${process.env.REACT_APP_QUIZ_GATEWAY_ENDPOINT_GET}/quiz` ,
  headers: {
    'Content-Type': 'application/json'
  }
});

quizSingleApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log("videoAPIClient - token: ", token);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const PPTApiClient = axios.create({
  baseURL: process.env.REACT_APP_PPT_GATEWAT_ENDPOINT_GET,
  headers: {
    'Content-Type': 'application/json'
  }
});

PPTApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log("videoAPIClient - token: ", token);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const PPTInstApiClient = axios.create({
  baseURL: process.env.REACT_APP_PPT_GATEWAY_ENDPOINT_INST_GET,
  headers: {
    'Content-Type': 'application/json'
  }
});

PPTInstApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log("videoAPIClient - token: ", token);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const PPTSingleApiClient = axios.create({
  baseURL: `${process.env.REACT_APP_PPT_GATEWAT_ENDPOINT_GET}/quiz` ,
  headers: {
    'Content-Type': 'application/json'
  }
});

PPTSingleApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log("videoAPIClient - token: ", token);
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
export { quizApiClient }
export { quizAPiClientUplaod }
export { quizInstApiClient }
export { quizSingleApiClient }
export { PPTApiClient }
export { PPTInstApiClient }
export { PPTSingleApiClient }