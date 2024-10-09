const errorMiddleware = (err,req,res,next)=>{
 
    console.log(err);
    res.status(500).send({success:false,message:"somthing when wrong", err});
   
   
};


export default errorMiddleware;