import express from 'express'
import dotenv from 'dotenv'

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.get('/',(req,res)=>{
    res.send("<h1>hello world</h1>")
});

app.listen(3000, ()=>{

    console.log("server is running in port 3000");

});