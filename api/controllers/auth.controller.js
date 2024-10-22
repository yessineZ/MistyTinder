import User from "../Models/User.model.js";
import bcrypt from 'bcryptjs'  ; 
import {setToken} from '../lib/setUpToken.js' ; 
import { setCookie } from "../lib/setCookies.js";

export const signUp = async (req,res) => {
    try {
        console.log(req.body) ; 
        const { username , email , password , confirmPassword , gender , age , genderPreference } = req.body ;
        if(!username || !email || !password || !age || !gender || !genderPreference) {
            return res.json({ message : "Please fill all the fields"}) ;
        }
        if(age < 18) {
            return res.json({ message : "You must be at least 18 years old"}) ;
        }
        if(password.length < 6) {
            return res.json({ message : "Password must be at least 6 characters"}) ;
        }
        if(password!== confirmPassword) {
            return res.json({ message : "Passwords do not match"}) ;
        }
        let existingUser = await User.findOne({ username : username }) ;
        if(existingUser) {
            return res.json({ message : "Username taken"}) ;
        }
        existingUser = await User.findOne({ email : email }) ;
        if(existingUser) {
            return res.json({ message : "Email taken"}) ;
        }
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!emailRegex.test(email)) {
            return res.json({ message : "Please Enter a valid Email"}) ;
        }
        
        const hashedPassword = await bcrypt.hash(password,10) ;
        const newUser = new User({ username , email , password : hashedPassword , gender , genderPreference , age }) ;
        if(newUser) {
            const token = setToken(newUser._id) ;
            setCookie(res,token) ; 
        }
        await newUser.save() ;
        
        res.status(201).json({ message : "User created successfully",user : newUser}) ;
        
    }catch(err) {
        console.log(err.message)  ;
        res.status(500).json({ message : err.message}) ;
    }
}

export const signIn = async (req,res) => {
    try {
        const { username , password } = req.body ;
        if(!username || !password) {
            return res.status(400).json({ message : "Please enter all fields"}) ;
        }

        const user = await User.findOne({ username : username }) ;

        if(!user) {
            return res.status(400).json({ message : "User not found"}) ;
        }
        const isMatch = await bcrypt.compare(password , user.password) ;
        if(!isMatch) {
            return res.status(400).json({ message : "Incorrect username or password"}) ;
        }

        const token = setToken(user._id) ;
        setCookie(res,token) ; 
        res.status(200).json({ message : "User logged in successfully" , user: user }) ;

    }catch(err) {
        console.log(err.message)  ;
    }
}
export const signOut = async (req,res) => {
    try {
        res.clearCookie("jwt") ;
        res.status(200).json({ message : "User logged out successfully"}) ;
    }catch(err) {
        console.log(err.message)  ;
    }
}


export const getMe = async (req,res) => {
    try {
        const user = req.user ; 
        if(!user) {
            return res.status(401).json({ message : "Unauthorized"}) ;
        }
        res.status(200).json({user}) ; 


    }catch(err) {
        console.log('error in getMe function',err.message) ; 
    }
}
