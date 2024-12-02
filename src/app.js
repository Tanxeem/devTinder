import express from "express";
import connectDb from "./config/database.js";
import User from "./models/user.js";
import validateSignUpData from "./utils/validation.js";
import bcrypt from 'bcrypt';
import cookieParser from "cookie-parser";
import UserAuth from "./middlewares/auth.js";

const app = express();

app.use(express.json());
app.use(cookieParser())

app.post("/signup", async (req, res) => {
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


app.post("/login", async (req, res) => {
    try {
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("invalid cedentials")
        }

    // Encrypt the password
    const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){

            // create a JWT Token
            const token = await getJWT();
            console.log(token);
            

            // Add the token to cookie and send the response back to the user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 1 * 3600000)
            });

            res.send("User login Susscessfull")
        }else {
            throw new Error("invalid cedentials")
        }
  
    } catch (error) {
        res.status(400).send("ERROR :" + error.message)
    }
});

app.get('/profile', UserAuth, async (req, res) => {
    try {
            const user = req.user;
        
        res.send(user)
    } catch (error) {
        res.status(400).send("ERROR :" + error.message)
    }
    
})

app.post('/sendConnectionRequest',UserAuth, async (req, res) => {
    try {
        const user = req.user;
            console.log("Sending a connection request");
        
        res.send(user.firstName, "connection Request sent!")
    } catch (error) {
        res.status(400).send("ERROR :" + error.message)
    }
    
})



app.listen(8080, () => {
    connectDb();
    console.log("Server is successfully listening on port 8080.....");
});
