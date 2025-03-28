// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:8080', // Your Spring Boot backend URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // API functions for the three endpoints
// export const registerUser = (userData) => API.post('/api/auth/register', userData);
// export const verifyOtp = (otpData) => API.post('/api/auth/verify-otp', otpData);
// export const resendOtp = (emailData) => API.post('/api/auth/resend-otp', emailData);
// export const login = (loginData) => API.post('/api/auth/login', loginData);
// export const getUserProfile = () => API.get('/api/user/profile');

// // Admin APIs
// export const getAllUsers = (page = 0, size = 10) =>
//   API.get(`/api/admin/users?page=${page}&size=${size}`);
// export const approveUser = (userId) => API.put(`/api/admin/approve-user/${userId}`);
// export const rejectUser = (userId) => API.put(`/api/admin/reject-user/${userId}`);

// export default API;

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors (e.g., 401 Unauthorized)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or missing; redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const registerUser = (userData) => API.post('/api/auth/register', userData);
export const verifyOtp = (otpData) => API.post('/api/auth/verify-otp', otpData);
export const resendOtp = (emailData) => API.post('/api/auth/resend-otp', emailData);
export const login = (loginData) => API.post('/api/auth/login', loginData);
export const getUserProfile = () => API.get('/api/user/profile');

// Admin APIs
export const getAllUsers = (page = 0, size = 10) =>
  API.get(`/api/admin/users?page=${page}&size=${size}`);
export const approveUser = (userId) => API.put(`/api/admin/approve-user/${userId}`);
export const rejectUser = (userId) => API.put(`/api/admin/reject-user/${userId}`);

// Coordinator APIs
export const getCoordinatorProfile = (userId) =>
  API.get(`/api/coordinator/${userId}`);
export const getScholarUsers = (page = 0, size = 10, role = 'SCHOLAR') =>
  API.get(`/api/coordinator/scholar-users?page=${page}&size=${size}&role=${role}`);
export const updateScholar = (id, scholarData) =>
  API.put(`/api/coordinator/${id}`, scholarData);
export const generateReport = (scholarId) =>
  API.post(`/api/coordinator/generate-report/${scholarId}`, null, {
    responseType: 'blob', // For handling PDF download
  });
export const downloadReport = (scholarId) =>
  API.get(`/api/coordinator/report/${scholarId}`, {
    responseType: 'blob', // For handling PDF download
  }); 

export default API;