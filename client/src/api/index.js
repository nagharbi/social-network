import axios from 'axios';
import env from "react-dotenv";
import InMemory from '../components/Auth/InMemory';

const api = axios.create({ baseURL: env.API_BASE_URL });

api.interceptors.request.use((req) => {
    if (InMemory.getToken()) {
        req.headers.Authorization = `Bearer ${InMemory.getToken()}`;
    }

    return req;
});

export const signIn = (formData) => api.post('/api/auth/login', formData);
export const signUp = (formData) => api.post('/api/auth/register', formData);

export const getUser = (userId) => api.get(`/api/user/${userId}`);
export const getUsers = () => api.get('/api/user');

export const getPosts = (limit) => api.get(`/api/post?limit=${limit}`);
export const getAllPosts = () => api.get(`/api/post`);
export const addPost = (data) => api.post('/api/post/messages', data);
export const likePost = (postId, {userId, like}) => api.patch(`/api/post/${postId}/like`, {userId, like});
export const updatePost =(postId, message) => api.put(`/api/post/${postId}`, { message });
export const deletePost =(postId) => api.delete(`/api/post/${postId}`);
export const addComment = (postId, comment) => api.post(`/api/comment/post/${postId}`, comment);
export const deleteComment = (postId, comment) => api.delete(`/api/comment/post/${postId}`, { data: comment});
export const editComment = (postId, comment) => api.put(`/api/comment/post/${postId}`, comment);
