import {signUp , signIn, signOut , getMe} from "../controllers/auth.controller.js";
import express from 'express' ;
import { checkAuth } from "../middleware/CheckAuth.js";
const router = express.Router() ;

router.post('/signUp',signUp) ;
router.post('/signIn',signIn)  ;
router.get('/signOut',signOut) ; 
router.get('/getMe',checkAuth,getMe) ; 



export default router ;
