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
  export const downloadReportRAC = (scholarId) =>
  API.get(`/api/rac-member/report/${scholarId}`, {
    responseType: 'blob', // For handling PDF view 
  }); 

  export const getAllRACMembers = () => API.get('/api/coordinator/all?page=1&size=10');
  export const updatedRACMember = (id, updatedRACMember) =>
    API.put(`/api/coordinator/update/${id}`, updatedRACMember);

  export const uploadNotice = (formData) => {
  return API.post('/api/admin/upload/notice', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      },
    });
  };

  // RAC Member APIs 
  export const getReportsForApproval = () => API.get('/api/rac-member/all/reports');
  export const approveReport = (reportId) => API.put(`/api/rac-member/approve-report/${reportId}`);
  export const getReportSignatures = (reportId) => API.get(`/api/signatures/report/${reportId}`); // New API for signatures
  export const uploadSignature = (reportId, formData) => {
  return API.post(`/api/signatures/upload/${reportId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  };
  export const viewSignature = () => API.get('/api/rac-member/signature');
  // Add this to your existing api.js exports
  export const rejectReport = (reportId, rejectionData) => {
    return API.put(`/api/rac-member/reject-report/${reportId}`, rejectionData);
  };

  // Scholar
  export const getScholarDetails = (scholarId) => API.get(`/api/scholar/${scholarId}`);
  export const getApprovedReport = () => API.get('/api/phd-scholar/approved');
  export const viewSignedReport = (reportId) =>
  API.get(`/api/phd-scholar/report/${reportId}`, {
    responseType: 'blob', 
    headers: {
      'Accept': 'application/pdf',
    }
  });
  // Add to your existing API exports
  export const getAllNotices = (page = 0, size = 10) => 
    API.get(`/api/notice/all?page=${page}&size=${size}`);

  // export const downloadNotice = (noticeId) => 
  //   API.get(`/api/notice/download/${noticeId}`, {
  //     responseType: 'blob',
  //   });
    // Add to your existing API exports
  export const downloadNotice = (noticeId) => 
    API.get(`/api/notice/${noticeId}`, {
      responseType: 'blob',
      headers: {
        'Accept': 'application/pdf',
      }
    });



export default API;