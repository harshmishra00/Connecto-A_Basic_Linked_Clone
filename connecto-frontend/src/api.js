import axios from 'axios';


const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {

            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


export const createPost = async (formData) => {
    const token = localStorage.getItem('token');
    return api.post('/api/posts', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
};


export const likePost = async (postId) => {
    const token = localStorage.getItem('token');
    return api.put(`/api/posts/like/${postId}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export default api;
