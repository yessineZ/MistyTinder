import axios from 'axios';
import { create } from 'zustand' ; 
import toast from 'react-hot-toast';
import { getSocket, initializeSocket } from '../socket/socket.client';
export const useMatchStore = create((set,get) => ({
    matches: [] ,
    users : [] ,
    isLoadingMyMatches : false ,
    isLoadingUsers : false ,
    getMyMatches : async () => {
        try {
            set({isLoadingMyMatches: true}); 
            const res = await axios.get('/api/match') ;
            set({matches : res.data.matches}) ; 
        } catch (error) {
            console.error(error) ; 
            toast.error(error.response.data.message) ; 
        }
        finally{
            set({isLoadingMyMatches: false});
        }
    },
    getUsersProfiles : async () => {
        try {
            set({isLoadingUsers: true});
            const res = await axios.get('/api/match/user-profiles') ;
            set({users : res.data.users}) ;
            console.log(res) ;  
        } catch (error) {
            console.error(error) ; 
            set({users : []});
            toast.error(error.response.data.message) ; 
        }finally{
            set({isLoadingUsers: false});
        }
    },


    swipeUser : async (dir,user) => {
        try {
            switch(dir) {
                case 'left' : 
                    try {
                        const res = await axios.post(`/api/match/swipe-left/${user._id}`)  ;
                        toast.success(res.data?.message || 'good choice he/she is bad') ; 

                        }catch(err) {
                            console.log(err.message);
                        }
                        break;
                case 'right' :
                    try {
                        const res = await axios.post(`/api/match/swipe-right/${user._id}`)  ;
                        toast.success(res.data?.message || 'good choice he/she is good') ; 

                    }catch(err) {
                        console.log(err.message);
                        toast.error(err.message);
                    } 
                
            }

        }catch(err) {
            console.error(err);
            toast.error('Failed to swipe user');
        }

    },

    setMatches: (matches) => set({ matches }),
    addMatch: (match) => set((state) => ({ matches: [...state.matches, match] })),
    removeMatch : (matchId) => set((state) => ({ matches: state.matches.filter((match) => match._id !== matchId) })),

    subscribeToNewMatch : () => {
        try {
            const socket = getSocket()  ; 
            socket.on('new-match', (newMatch) => {
                set((state) => ({
                    matches: [...state.matches, newMatch]
                }))
            }) ;
            toast.success('New match created') ; 

        }catch(err) {
            console.error(err);
        }
    },

    unsubscribeFromNewMatches : () => {
        try {
            const socket = getSocket() ; 
            socket.off('new-match') ; 
        }catch(err) {
            console.error(err);
        }
    }
}
)
);

