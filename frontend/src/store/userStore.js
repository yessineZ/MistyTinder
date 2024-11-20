import toast from 'react-hot-toast';
import { create } from 'zustand';
import axios from 'axios';
import { disconnectSocket, initializeSocket } from '../socket/socket.client.js';
const userStore = create((set) => ({
    user: null,
    isLoading: false,
    setUser: (user) => set({ user }),
    getMe: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get('/api/auth/getMe');
            set({ user: response.data.user, isLoading: false });
            initializeSocket(response.data.user._id) ; 
        } catch (err) {
            console.error(err);
            const statusCode = err.response?.status;
            if (statusCode === 401) {
                toast.error('Unauthorized: Please log in.');
            }
            set({ isLoading: false });
        }
    },
    logout: async () => {
        try {
            const response = await axios.get('/api/auth/signOut');
            disconnectSocket() ; 
            toast.success(response.data?.message || 'Logout successfully');
            set({ user: null, isLoading: false });
        } catch (err) {
            console.log(err.message);
            toast.error('Failed to logout');
        } finally {
            set({ isLoading: false, user: null });
        }
    },
    updateUser: async (data) => {
        set({ isLoading: true });
        try {
            const response = await axios.put('/api/users/update', data);
            toast.success(response.data?.message || 'User updated successfully');
            set({ user: response.data?.user , isLoading : false }) ;
        }catch(err) {
            console.error(err);
            toast.error('Failed to update user');
        }
    }
}));
export default userStore;