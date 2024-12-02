import express from "express";
import connectDb from "./config/database.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js"
import profileRouter from "./routes/profile.js"
import requestRouter from './routes/requests.js'


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)


app.listen(8080, () => {
    connectDb();
    console.log("Server is successfully listening on port 8080.....");
});
