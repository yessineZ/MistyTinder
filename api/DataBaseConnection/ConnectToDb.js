import  mongoose from "mongoose";
export const ConnectToDb = async () => {
    try {
       await  mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log("connected to db") ;
        })


    }catch(err) {
        console.log(err.message);

    }
}