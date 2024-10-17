import jwt from 'jsonwebtoken' ;
export const setToken = (id) => {
    try {
        const token = jwt.sign({ id } , process.env.JWT_SECRET , {
            expiresIn : "1d",
             
        });
        return token ; 
        
    }catch(err) {
        console.log(err.message) ; 
    }

}