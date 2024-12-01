import express from "express";
import connectDb from "./config/database.js";
import User from "./models/user.js";
import validateSignUpData from "./utils/validation.js";
import bcrypt from 'bcrypt';
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';

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
    const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){

            // create a JWT Token
            const token = await jwt.sign({_id: user._id}, "DEV@Tinder$786" )
            console.log(token);
            

            // Add the token to cookie and send the response back to the user
            res.cookie("token", token);

            res.send("User login Susscessfull")
        }else {
            throw new Error("invalid cedentials")
        }
  
    } catch (error) {
        res.status(400).send("ERROR :" + error.message)
    }
});

app.get('/profile', async (req, res) => {
    try {
        const cookies = req.cookies;
    
        const {token } = cookies;
        if(!token) {
            throw new Error("Invalid Token")
        }
    
        const decodedMessage = await jwt.verify(token, "DEV@Tinder$786")
    
        const { _id } = decodedMessage;
        console.log("Logged In user is: " + _id);

        const user = await User.findById(_id)
        if(!user) {
            throw new Error("User does not exist")
        }
        
        res.send(user)
    } catch (error) {
        res.status(400).send("ERROR :" + error.message)
    }
    
})

// app.get("/user", async (req, res)=> {
//     const {emailId, firstName, lastName, password} = req.body;
//    try {
//     const user = await User.find( {})
//     res.send(user)
//    } catch (error) {
//     console.log(error);
//    }
// })

// app.patch('/user/:userId', async(req, res) => {
//     const userId = req.params?.userId;
//     const data = req.body;

//     try {
//         const ALLOWED_UPDATE = ["photoUrl", "about", "gender" , "age", "skills"];
//     const isUpdateAllowed = Object.keys(data).every( (k) =>
//         ALLOWED_UPDATE.includes(k)
//     )
//     if(!isUpdateAllowed){
//         throw new Error("update not allowed")
//     }
//         const user = await User.findByIdAndUpdate({_id: userId}, data, {
//             returnDocument: "after",
//             runValidators: true,
//         })
//         console.log(user);
//         res.send("User updated successfully")
//     } catch (error) {
//         res.status(400).send("Something went wrong with Updating" + error.message)
//     }
// })

// app.delete('/user', async(req, res) => {
//     const userId = req.body.userId;
//     try {
//         const user = await User.findByIdAndDelete( {_id: userId} )
//         res.send("User deleted successfully")
//     } catch (error) {
//         res.status(400).send("Something went wrong")
//     }
// })

app.listen(8080, () => {
    connectDb();
    console.log("Server is successfully listening on port 8080.....");
});
