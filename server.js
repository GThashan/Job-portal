import express from 'express'
import dotenv from 'dotenv'
import dbconn from './config/db.js'
import cors from 'cors'
import authRoute from './routes/authRoute.js'
dotenv.config();


const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use('/api/v1/auth',authRoute)
dbconn();
app.listen(3000, ()=>{

    console.log("server is running in port 3000");

});