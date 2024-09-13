import { create } from 'zustand';
import axios from '../lib/axios';
import toaster from 'react-hot-toast';

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({ name, email, password, confirmPassword }) => {
        set({ loading: true });
        if (password !== confirmPassword) {
            set({ loading: false });
            return toaster.error('Passwords do not match', { id: 'signup' });

        }

        try {
            const res = await axios.post('/auth/signup', { name, email, password });
            set({ user: res.data.user });
            set({ loading: false });
            toaster.success('Account created successfully', { id: 'signup' });
        } catch (error) {
            set({ loading: false });
            toaster.error(error.response.data.message || 'An error occurred', { id: 'signup' });
        }
    },

    login: async ({ email, password }) => {
        set({ loading: true });
        try {
            const res = await axios.post('/auth/login', { email, password })
            set({ user: res.data.user });
            set({ loading: false });
            toaster.success(`Welcome ${res.data.user.name}`, { id: 'login' });

        } catch (error) {
            set({ loading: false });
            toaster.error(error.response.data.message || 'An error occurred', { id: 'login' });

        }
    },

    logout: async () => {
        set({ loading: true });
        try {
            await axios.post('/auth/logout');
            set({ user: null });
            set({ loading: false });
            toaster.success('Logout successfully', { id: 'logout' });

        } catch (error) {
            set({ loading: false });
            toaster.error(error.response.data.message || 'An error occurred', { id: 'logout' });
        }
    },

    checkAuth: async () => {
        set({ checkingAuth: true });
        try {
            const res = await axios.get('/auth/profile');
            set({ user: res.data.user });
            set({ checkingAuth: false });

        } catch (error) {
            set({ checkingAuth: false });
            console.log(error.response.data.message);
            // toaster.error(error.response.data.message || 'An error occurred', {id: 'checkAuth'});
        }
    },

    updateProfile: async (name, email) => {
        set({ loading: true });
        try {
            const res = await axios.put('/auth/profile', { name, email });
            set({ user: res.data.user });
            set({ loading: false });
            toaster.success(res.data.message, { id: 'updateProfile' });
        } catch (error) {
            set({ loading: false });
            toaster.error(error.response.data.message || 'An error occurred', { id: 'updateProfile' });
        }
    },

    refreshToken: async () => {
		if (get().checkingAuth) return;
		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},

}));


let refreshPromise = null;
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                if(refreshPromise){
                    await refreshPromise;
                    return axios(originalRequest);
                }

                refreshPromise = useUserStore.getState().refreshToken();
                await refreshPromise;
                refreshPromise = null;

                return axios(originalRequest);
            } catch (refreshError) {
                useUserStore.getState().logout();
                return Promise.reject(refreshError);
                
            }
        }
        return Promise.reject(error);
    }
);