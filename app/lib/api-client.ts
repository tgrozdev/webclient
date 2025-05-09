import axios from 'axios';

const apiClient = axios.create({
  baseURL: `http://localhost/api.php`,
  //baseURL: `${window.location.protocol}//${window.location.hostname}/api.php`,  
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors here
    console.log(error);
    return Promise.reject(error);
  }
);

export default apiClient; 