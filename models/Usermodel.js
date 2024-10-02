import mongoose from "mongoose";
import validator from 'validator'

const Userschema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'Name is required']
    },

    lastName:{
        type:String
    },
    email:{
        type:String,
        require:[true,'Email is required'],
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        require:[true,'Password is required']
    },
    location:{
        type:String,
        default:"Sri Lanka"
    }
},{timestamps:true});


export default mongoose.model('User',Userschema);