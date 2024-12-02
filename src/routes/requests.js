import express from 'express';
import UserAuth from "../middlewares/auth.js";

const requestRouter = express.Router();


requestRouter.post('/sendConnectionRequest',UserAuth, async (req, res) => {
    try {
        const user = req.user;
            console.log("Sending a connection request");
        
        res.send(user.firstName, "connection Request sent!")
    } catch (error) {
        res.status(400).send("ERROR :" + error.message)
    }
    
})


export default requestRouter;