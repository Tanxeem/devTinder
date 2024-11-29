import express from 'express';
import connectDb from './config/database.js';

const app = express();

app.get('/hello', (req, res)=> {
    res.send("Hello")
})

app.listen(8080, ()=>{
    connectDb(); 
    console.log("Server is successfully listening on port 8080.....");
})