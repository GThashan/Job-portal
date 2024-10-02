import Usermodel from "../models/Usermodel.js";
import bcrypt from 'bcrypt';

export const registerController = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name){
            return res.status(400).send({success:false,message:'Name is required'});
        }
        if(!email){
            return res.status(400).send({success:false,message:'Email is required'});
        }
        if(!password){
            return res.status(400).send({success:false,message:'Password is required'});
        }

        const exitingUser = await Usermodel.findOne({email});
        if(exitingUser){
            return res.status(400).send({success:false,message:'User alredy exit'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Usermodel.create(
            {
                name,
                email,
                password: hashedPassword 
            }
        );

        return res.status(201).send({success:true,message:'Register successfully'})
    } catch (error) {
        return res.status(200).send({success:false,message:'Server error', error});
        console.log(error);
   
    }
};