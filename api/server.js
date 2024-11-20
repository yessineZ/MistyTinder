import express from "express";
import authRoute from "./routes/auth.routes.js";
import userRoute from './routes/user.routes.js';
import messagesRoutes from './routes/messages.routes.js';
import matchRoutes from './routes/match.routes.js';
import dotenv from "dotenv";
import { ConnectToDb } from "./DataBaseConnection/ConnectToDb.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { initialiseSocket } from "./socket/socket.server.js";
import { v2 as cloudinary} from 'cloudinary' ; 
import  { createServer } from "http" ; 
dotenv.config({ path: "./.env" });
const app = express() ;

const httpServer = createServer(app) ; 

initialiseSocket(httpServer) ; 
 
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL   
}));


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());  


// Routes


app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/messages', messagesRoutes);
app.use('/api/match', matchRoutes);
const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
    ConnectToDb() ;  
    console.log(`Server running on PORT ${port}`);
});