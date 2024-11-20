import {Server} from 'socket.io' ; 
import env from 'dotenv' ; 
let io  ;
const connectedUsers = new Map() ;
//{userId : socket.id} 
env.config({}) ;
console.log(process.env.CLIENT_URL) ;
export const initialiseSocket = (httpServer) => {
    io = new Server(httpServer, 
        { cors : { origin : '*' }});

    
    io.use((socket,next) => {
        const userId = socket.handshake.auth.userId ; 
        if(!userId) {
            return next(new Error("Authentication error")) ;
        }

        socket.userId =  userId ;
        next() ;  
    });
    io.on('connection', (socket) => {
        console.log('User Connected with socket id : '+socket.id) ; 
        connectedUsers.set(socket.userId , socket.id  ) ; 
    
    socket.on('disconnect', () =>{
        console.log('User Disconnected with socket id : '+socket.id) ; 
        connectedUsers.delete(socket.userId) ;  // remove user from connectedUsers map when they disconnect  ;  // remove user from connectedUsers map when they disconnect  ;  

    })});
}

export const getIO = () => {
    if(!io) {
        throw new Error("Socket.IO has not been initialised") ;
    }
    return io ; 
}

export const getUsersConnected = () => connectedUsers ; 