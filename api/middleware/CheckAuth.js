import User from "../Models/User.model.js";
import jwt from "jsonwebtoken";

export const checkAuth = async (req,res,next) => {
    
    try {
        
    const token = req.cookies.jwt ;
    if(!token) {
        return res.status(401).json({ message : "Unauthorized"})
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET) ;

    req.user = await User.findById(decoded.id).select("-password") ;

    if(!req.user) {
        return res.status(401).json({ message : "Unauthorized"})
    }

    next();
  }catch(err) {
    console.log(err.message,"in middleware") ; 
    res.status(500).json({ message : err.message}) ;
}
}