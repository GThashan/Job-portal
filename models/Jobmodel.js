import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'company name is required']
    },
    position:{
        type:String,
        required:[true,'company name is required'],
        maxlength:100
    },
    status:{
        type:String,
        enum:['pending','reject','interview'],
        default:'pending',  
    },
    worktype:{
        type:String,
        enum:['full-time','part time','internship','contaract'],
        default:'full-time',  
    },
    worklocation:{
        type:String,
        default:'Sri lanka',  
        required:[true,"location is needed"]
    },
    createdby:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

export default mongoose.model('job',jobSchema)