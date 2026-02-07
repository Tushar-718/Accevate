import axios from 'axios';
import { API_BASE_URL } from '@env';

const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiInstance.interceptors.request.use(
  async (config) => {
    console.log('API Request ➡️➡️:', {
      baseURL: config.baseURL,
      method: config.method?.toUpperCase(),
      url: config.url,
      params: config.params,
      body: config.data,
    });

    return config;
  },
  (error) => {
    console.log('API Request Error ➡️➡️ :', error);
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    console.log('⬅️⬅️ API Response :', response.data);
    return response;
  },
  (error) => {
    console.log('⬅️⬅️ API Response Error :', error);
    // Handle global errors like 401 Unauthorized here
    return Promise.reject(error);
  }
);

export default apiInstance;
