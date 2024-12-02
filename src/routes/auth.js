import express from 'express';
import User from "../models/user.js";
import validateSignUpData from "../utils/validation.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authRouter = express.Router();


authRouter.post("/signup", async (req, res) => {
    try {
    // validation of data
        validateSignUpData(req)

        const {firstName, lastName, emailId, password} = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);


    // createing a new instance of the user model
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
    });

    
        await user.save();
        res.send("Data saved Successfully");
    } catch (error) {
        res.status(400).send("ERROR :" + error.message)
    }
});


authRouter.post("/login", async (req, res) => {
    try {
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("invalid cedentials")
        }

    // Encrypt the password
    // const isPasswordValid = await user.validatePassword(password);
    const isPasswordValid = await bcrypt.compare(
        password, 
        user.password
    );

        if(isPasswordValid){

            // create a JWT Token
            // const token = await getJWT();
            const token = await jwt.sign({_id: user._id}, "DEV@Tinder$786", {expiresIn: "1d"} )

            // Add the token to cookie and send the response back to the user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000)
            });

            res.send("User login Susscessfull")
        }else {
            throw new Error("invalid cedentials")
        }
  
    } catch (error) {
        res.status(400).send("ERROR :" + error.message)
    }
});


export default authRouter;