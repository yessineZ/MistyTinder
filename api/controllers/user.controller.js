import User from "../Models/User.model.js";
import { v2 as cloudinary } from 'cloudinary' ; 
export const updateProfile = async (req,res) => {
    try {
        const user = req.user ; 
        if(!user) {
            return res.status(401).json({ message : "Unauthorized"}) ;
        }

        const { image , ...otherdata } = req.body ;
        let result ;
        if(image) {
            if(user.image) {
                await cloudinary.uploader.destroy(user.image) ;
            }
            result = await cloudinary.uploader.upload(image , {
                folder : "tinder-clone"
            }) ;

        }

        await User.findByIdAndUpdate(user._id , {
            $set : {
                ...otherdata , 
                image : result.secure_url || user.image
            }
        }) ;

        res.status(200).json({ message : "Profile updated successfully" , user}) ;

    }catch(err) {
        console.log(err.message+"in updateProfile") ;
        res.status(500).json({ message : "Server error"}) ; 
    }
}