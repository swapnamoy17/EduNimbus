const TOKEN_EXPIRED = "The incoming token has expired"

const apiCall = async ({ method, url, data = null, headers = {}, params = {} }, apiClient) => {
  try {
    const config = {
      method,
      url,
      params,
      data,
      headers
    };
    
    const response = await apiClient.request(config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message === TOKEN_EXPIRED) {
      window.location.href = '/login';
    }
    console.error(`Error with ${method} request to ${url}:`, error);
    throw error;
  }
};

export default apiCall;
