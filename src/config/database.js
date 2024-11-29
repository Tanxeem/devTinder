import mongoose from "mongoose";


const connectDb = async() =>{
   try {
    await mongoose.connect("mongodb+srv://tanxeem:devtinder@devtinder.yegbm.mongodb.net/devTinder")
    console.log("Databse Connection established.......")
   } catch (error) {
    console.error("Database cannot be connected !!!", error);
    
   }
}

export default connectDb;