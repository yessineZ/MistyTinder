import mongoose from 'mongoose' ;


const userSchema = new mongoose.Schema({
    username : {
        type : String ,
        required: true ,
        unique : true ,
    },
    email : {
        type : String ,
        required : true ,
        unique : true ,
        match : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    password : {
        type : String , 
        required : true ,
        minLength : 6 , 
    },
    gender : {
        type : String ,
        enum : ["male" , "female"] , 
        required : true ,
    },
    genderPreference : {
        type : String ,
        enum : ["male" , "female","both"] , 
        required : true ,
    },
    bio : {
        type : String ,
        default  : ""        
    },

    image : {
        type : String ,
        default : ""
    },
    age : {
        type : Number ,
        required : true ,
    },
    likes :  [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    }
    ],
    dislikes : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    }],
    matches : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    }]
    },{
        timestamps : true
    }
)

const User =  mongoose.model("User" , userSchema) ; 
export default User ;  