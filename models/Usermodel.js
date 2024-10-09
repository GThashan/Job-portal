import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'

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

Userschema.pre("save", async function(){
    if(!this.isModified) return;
    var salt = bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);

});

Userschema.methods.creatJWT = function(){
    return JWT.sign({userId:this._id},process.env.JWT_SCRET,{expiresIn:'1d'})
}
Userschema.methods.comparePassword =async function(userPassword){
   const isMatch = await bcrypt.compare(userPassword,this.password);
   return isMatch;
}

export default mongoose.model('User',Userschema);