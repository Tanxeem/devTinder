import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const UserAuth = async (req, res, next) => {

    try {
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token is invalid")
        }
        const decodeObj = await jwt.verify(token, "DEV@Tinder$786");
        const {_id} = decodeObj;
        const user = await User.findById(_id);
        if(!user){
            throw new Error ("User not found")
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send("ERROR: " + error.message)
    }
}

export default UserAuth;