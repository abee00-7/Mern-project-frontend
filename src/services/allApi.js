import axios from 'axios';

const baseURL = 'https://career-backend-5.onrender.com'; //

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

const allapi = {
  signup: async (userData) => {
    try {
      const response = await axiosInstance.post('/api/signup', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/api/login', credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getProfile: async (token) => {
    try {
      const response = await axiosInstance.get('/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateProfile: async (token, profileData) => {
    try {
      const response = await axiosInstance.put('/api/profile/update', profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getCollegeProfile: async (token) => {
    try {
      const response = await axiosInstance.get('/api/college/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateCollegeProfile: async (token, profileData) => {
    try {
      const response = await axiosInstance.put('/api/college/profile/update', profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchTestQuestions: async (token) => {
    try {
      const response = await axiosInstance.get('/api/questions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  submitTestAnswers: async (token, answers) => { // Use 'testAnswers' for consistency
    try {
      const response = await axiosInstance.post('/api/submit', answers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchCollegesByCutoffFromUsers: async (marks) => {
    try {
      const response = await axiosInstance.get(`/api/colleges/${marks}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Admin functionalities
  getAllColleges: async () => {
    try {
      const response = await axiosInstance.get('/api/colleges');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllStudents: async () => {
    try {
      const response = await axiosInstance.get('/api/students');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllQuestions: async () => {
    try {
      const response = await axiosInstance.get('/api/questions');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addQuestion: async ( newQuestion) => {
    try {
      const response = await axiosInstance.post('/api/questions', newQuestion, {
       
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteQuestion: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/questions/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteStudent: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/students/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteCollege: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/colleges/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchRegisteredColleges: async () => {
    try {
      const response = await axiosInstance.get('/api/colleges');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default allapi;
