import io from 'socket.io-client' ; 

const SOCKET_URL = 'http://localhost:3000' ; 

let socket = null ; 

export const initializeSocket = (userId) => {
    if(socket) return ;
    socket = io(SOCKET_URL, { auth : { userId } }) ;
    console.log(userId) ; 
}

export const getSocket = () => {
    if(!socket) {
        throw new Error('Socket not initialized') ;
    }
    return socket ;  
}

export const disconnectSocket = () => {
    if(socket) {
        socket.disconnect() ;
        socket = null ;
        console.log('Socket disconnected') ;
    }
   
}