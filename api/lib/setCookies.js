export const setCookie = (res,token) => {
    
    res.cookie("jwt" , token , { httpOnly : true , sameSite : "strict" , secure : process.env.NODE_ENV === "production" , maxAge : 60*60*24*1000 }) ; 

}