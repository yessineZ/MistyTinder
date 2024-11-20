import express from 'express' ;
import { swipeRight , swipeLeft , getMatches , getUsersProfile } from "../controllers/match.controller.js";
import { checkAuth } from '../middleware/CheckAuth.js';
const router = express.Router() ;


router.post('/swipe-right/:likedUserId',checkAuth,swipeRight) ; 
router.post('/swipe-left/:dislikedUserId',checkAuth,swipeLeft) ;
router.get('/',checkAuth,getMatches)  ;
router.get('/user-profiles',checkAuth,getUsersProfile) ;


export default router ;