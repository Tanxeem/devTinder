import mongoose from "mongoose";
import validator from 'validator';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        minLength: 4,        
    },
    lastName : {
        type: String,
        required: true,
    },
    emailId : {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid Email Address" + value)
            }
        }
    },
    password : {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please Enter a Strong Password" + value)
            }
        }
    },
    age : {
        type: Number,
    },
    gender : {
        type: String,
        validate(value) {
            if(!["male", "female", "other"].includes(value)){
                throw new Error("Gender date is not valid")
            }
        }, 
    },
    photoUrl: {
        type: String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid URL Address" + value)
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about of the User!"
    },
    skills: {
        type: [String],
    },

}, 
{
    timestamps: true
});

userSchema.method.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({_id: user._id}, "DEV@Tinder$786", {expiresIn: "7d"} )

    return token;
}

userSchema.method.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.this;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
}

const User =  mongoose.model("User", userSchema);
export default User;