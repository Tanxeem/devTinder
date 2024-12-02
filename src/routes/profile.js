import express from 'express';
import UserAuth from "../middlewares/auth.js";

const profileRouter = express.Router();


profileRouter.get('/profile', UserAuth, async (req, res) => {
    try {
            const user = req.user;
        
        res.send(user)
    } catch (error) {
        res.status(400).send("ERROR :" + error.message)
    }
    
})


export default profileRouter;