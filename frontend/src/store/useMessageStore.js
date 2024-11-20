import {create} from 'zustand' ; 
import userStore from './userStore';
import axios from 'axios';
import { getSocket } from '../socket/socket.client';
export const useMessageStore = create((set) => ({
    messages: [],
    loading : true ,
    sendMessage: (receiverId,message) => {
        try  {
            set(state => ({
                messages : [...state.messages , {sender : userStore.getState().user._id, message  , recipient : receiverId}]
            }));
            const res = axios.post(`/api/messages/send/`,{
                sender : receiverId,
                text: message
            })
            console.log(res.data) ; 

        }catch(err) {
            console.log(err.message) ; 

        }finally{
            set({loading : false});
        }
    },
    getMessages: async (userId) => {
        try {
            set({loading : true });
            const res = await axios.get(`/api/messages/conversation/${userId}`) ;
            set({messages : res.data.messages, loading : false}) ;  
        }catch(err) {
            console.log(err.message) ; 
            set({loading : false });
        }finally {
            set({loading : false});
        }
    },
    clearMessages: () => set({messages: []}),
    markAsRead: (messageId) => {
        // Mark the message as read in the API
        // Example: axios.put(`/api/messages/${messageId}/mark-as-read`)
        //.catch(error => console.error(error));
    },
    subscribeToMessages : () => {
        const socket = getSocket() ; 
        socket.on('New-Message',({message}) => {
            set((state) => ({messages : [...state.messages , message]})) ; 
        });
    },

    unsubscribeFromMessages : () => {
        const socket = getSocket() ; 
        socket.off('New-Message');
    }
}));