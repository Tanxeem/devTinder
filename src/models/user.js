import mongoose from "mongoose";
import validator from 'validator';


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
}
)

const User =  mongoose.model("User", userSchema);
export default User;