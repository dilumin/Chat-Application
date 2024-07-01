import axios from 'axios';
import { useContext, useRef } from 'react';
import AuthContext from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const useAxiosInstance = () => {
    const { Auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const isRefreshing = useRef(false);
    const failedRequestQueue = useRef([]);

    const axiosInstance = axios.create({
        baseURL: 'https://testserver-arap.onrender.com',

        // baseURL: 'http://localhost:3500',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const refreshAccessToken = async () => {
        try {
            // const response = await axios.post('http://localhost:3500/refresh', {}, { withCredentials: true });
            const response = await axios.post('https://testserver-arap.onrender.com:3500/refresh', {}, { withCredentials: true });

            console.log("Response from refresh token: ", response.data);
            const accessToken = response.data.AccessToken;
            localStorage.setItem('accessToken', accessToken);
            console.log("old Token : ", Auth);
            setAuth({ accessToken });
            console.log("After setting to auth: ", Auth);
            console.log("New Token camee: ", accessToken);

            failedRequestQueue.current.forEach((req) => {
                req.resolve(axiosInstance(req.config));
            });
            failedRequestQueue.current = [];
            return accessToken;
        } catch (err) {
            setAuth({ accessToken: "" });
            localStorage.removeItem('accessToken');
            navigate('/login');
            failedRequestQueue.current.forEach((req) => {
                req.reject(err);
            });
            failedRequestQueue.current = [];
            return Promise.reject(err);
        } finally {
            isRefreshing.current = false;
        }
    };

    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if (error.response && error.response.status === 403 && !originalRequest._retry) {
                if (isRefreshing.current) {
                    return new Promise((resolve, reject) => {
                        failedRequestQueue.current.push({ resolve, reject, config: originalRequest });
                    }).then((accessToken) => {
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                        return axiosInstance(originalRequest);
                    }).catch((err) => {
                        return Promise.reject(err);
                    });
                }
                originalRequest._retry = true;
                isRefreshing.current = true;
                try {
                    const accessToken = await refreshAccessToken();
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest);
                } catch (err) {
                    return Promise.reject(err);
                }
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default useAxiosInstance;
