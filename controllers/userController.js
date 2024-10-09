import Usermodel from "../models/Usermodel"

export const updateController = async(req,res,next)=>{
  try {
    const {name,lastName,email,password,location} = req.body;
    if(!name || !lastName || !email || !password || !location){
        next("provide all feilds");
    }
    const user = await Usermodel.findOne({_id : req.user.userId});
    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user.location = location;

    await user.save();
    const token = user.creatJWT();

    return res.status(200).json({user,token})
    
  } catch (error) {
  
     console.log(error);

  }
   
   
    
}