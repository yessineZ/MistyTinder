import express from 'express' ;
import { sendMessage , getMessages } from '../controllers/messages.controller.js';
import { checkAuth } from '../middleware/CheckAuth.js';
const router = express.Router() ;

// router.use(checkAuth) ; 
router.post('/send',checkAuth,sendMessage) ; 
router.get('/conversation/:userId',checkAuth,getMessages) ; 

export default router ;