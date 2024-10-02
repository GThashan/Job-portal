import Usermodel from "../models/Usermodel.js";


export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      next("name is required");
    }
    if (!email) {
      next("Email is required");
    }
    if (!password) {
      next("Password is required");
    }

    // Check if user already exists
    const existingUser = await Usermodel.findOne({ email });
    if (existingUser) {
      next("User already exists");
    }

    

    // Create a new user
    const user = await Usermodel.create({
      name,
      email,
      password,
    });

    const token = user.creatJWT();

    return res.status(200).send({success:true,message :"Register sucesssfull",user,token})
  } catch (error) {
    next(error);
  }
};
