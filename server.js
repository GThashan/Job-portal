import express from 'express'
import dotenv from 'dotenv'
import dbconn from './config/db.js'
import cors from 'cors'

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.get('/',(req,res)=>{
    res.send("<h1>hello world</h1>")
});
dbconn();
app.listen(3000, ()=>{

    console.log("server is running in port 3000");

});