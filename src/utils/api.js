import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const apiService = {
  getPosts: () => api.get('/posts'),
  getPost: (id) => api.get(`/posts/${id}`),
  createPost: (data) => api.post('/posts', data),
  updatePost: (id, data) => api.put(`/posts/${id}`, data),
  deletePost: (id) => api.delete(`/posts/${id}`),
  register: (data) => api.post('/auth/register', data),
  login: (credentials) => api.post('/auth/login', credentials),
  getUsers: () => api.get('/auth/users'),
  deleteUser: (userId) => api.delete(`/auth/users/${userId}`),
  updateUserRole: (userId, role) => api.put(`/auth/users/${userId}/role`, { role }),
  getUserProfile: () => api.get('/auth/profile'),
  likePost: (postId) => api.post(`/posts/${postId}/like`),
  getLikedPosts: () => api.get('/posts/liked'),
};

export default apiService;