import express from 'express' ;
import { updateProfile } from '../controllers/user.controller.js';
import { checkAuth } from '../middleware/CheckAuth.js';

const router = express.Router() ;

router.put('/update',checkAuth,updateProfile) ; 

export default router ;