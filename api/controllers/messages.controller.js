import { Conversation } from "../Models/Conversation.model.js";
import { Message } from "../Models/Messages.model.js";
import { getIO, getUsersConnected } from "../socket/socket.server.js";
export const sendMessage = async (req, res) => {
    try {
        const { sender, text } = req.body;

        if (!sender || !text) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        const currentUser = req.user._id;

        const message = await Message.create({
            sender: currentUser,
            message: text,
            recipient: sender
        });

        //TODO SEND THE MESSAGE IN REAL TIME

        const io = getIO() ; 
        const connectedUser = getUsersConnected()  ; 
        const recipientId  = connectedUser.get(sender) ;
        if(recipientId) {
            io.to(recipientId).emit("New-Message", {
                message  : message
             });
        } 
        let conversation = await Conversation.findOne({
            members: { $all: [sender, currentUser] }
        });

    

        if (!conversation) {
            conversation = await Conversation.create({
                members: [sender, currentUser],
                messages: [message._id]
            });
        } else {
            conversation.messages.push(message._id);
        }
        console.log("we are here ") ; 

        await Promise.all([conversation.save(), message.save()]);

        return res.status(200).json({ message: "Message sent successfully" });
    } catch (err) {
        console.error(err.message + " Error at sendMessage function");
        return res.status(500).json({ message: "Server error" });
    }
};

export const getMessages = async (req,res) => {
    try {

        const { userId } = req.params ;

        if(!userId) {
            return res.status(400).json({message : "Please provide a user id"}) ;
        }
        const currentUserId = req.user._id ;
        console.log(userId+" is already" + currentUserId) ;
        const FindConversation = await Conversation.findOne({
            members : {
                $all : [currentUserId, userId]
            }
        }).populate("messages") ; 

        console.log(FindConversation) ; 
        

        
    

        return res.status(200).json({messages : FindConversation.messages}) ;


        
    } catch(error) {
        console.log(error.message+ "error at getMessages function") ;
        return res.status(500).json({message : "Server error"}) ;     
    }
}