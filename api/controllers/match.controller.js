import User from "../Models/User.model.js";
import { getIO } from "../socket/socket.server.js";
import { getUsersConnected } from "../socket/socket.server.js";

export const swipeRight = async (req,res) => {
    try {

        const { likedUserId} = req.params ; 
        const currentUserId = req.user._id ; 
        const currentUser = await User.findById(currentUserId) ;
        const likedUser = await User.findById(likedUserId) ; 
        if(!likedUser) return res.status(404).send({message : "User not found"}) ;
        if(!currentUser.likes.includes(likedUserId)) {
            currentUser.likes.push(likedUserId) ;
            await currentUser.save() ;
            // if the other User already liked the current user
            if(likedUser.likes.includes(currentUser.id)) {
                currentUser.matches.push(likedUserId) ; 
                likedUser.matches.push(currentUserId) ;
                await Promise.all([currentUser.save(),likedUser.save()]) ;
                
                // TODO SEND NOTIFICATION IF MATCH (added to the messages) SOCKET.IO 
                
                const connectedUsers = getUsersConnected() ; 
                const io = getIO() ;
                
            

                if(likedUser) {
                    io.to(connectedUsers.get(likedUser._id.toString())).emit("new-match",{
                        _id : currentUser._id ,
                        username : currentUser.username,
                        image : currentUser.image
                     }) ;
                } 
                if(currentUser) {
                    io.to(connectedUsers.get(currentUser._id.toString())).emit("new-match",{
                        _id : likedUser._id ,
                        username : likedUser.username,
                        image : likedUser.image
                     }) ;
                }
            }
        }
        return res.status(200).json({message : "User liked successfully",user : currentUser}) ;
    }catch(err) {
        console.log(err.message+"error at swipeRight function")  ;
        return res.status(500).json({message : "Server error"}) ;
    }
}


export const swipeLeft = async (req,res) => {
    try {
         const {dislikedUserId} = req.params ; 
         if(!dislikedUserId) return res.status(404).send({message : "User not found"}) ; 
         const currentUser = await User.findById(req.user._id) ;
        
         if(!currentUser.dislikes.includes(dislikedUserId)) {
            currentUser.dislikes.push(dislikedUserId) ;
            await currentUser.save() ;
         }

         return res.status(200).json({message : "User disliked successfully",user : currentUser}) ;

    }catch(err) {
        console.log(err.message+"error at swipeLeft function")  ;
        return res.status(500).json({message : "Server error"}) ;
    }
}


export const getMatches = async (req,res) => {
    try {        
        const userId = req.user._id  ; 
        const user = await User.findById(userId).populate("matches",["username","image"]) ;
        return res.status(200).json({matches : user.matches}) ;
    }catch(err) {
        console.log(err.message+"error at getMatches function")  ;
    }
}

export const getUsersProfile = async (req, res) => {
    try {
        const userId = req.user._id  ;
        const user = await User.findById(userId).select("-password") ;
        const users = await User.find({$and : [
        {_id : {$ne: userId}}  ,
        {_id : {$nin : user.matches}},
        {_id : {$nin : user.likes}},
        { _id : {$nin : user.dislikes}},
        {gender : user.genderPreference === "both" ? {$in : ["male","female"] } : user.genderPreference} ,
        {genderPreference : {$in : [user.genderPreference,"both"]}}
        ]}) ;

        return res.status(200).json({users}) ;

    }catch(err) {
        console.log(err.message+"error at getUsersProfile function")  ;
    }
}