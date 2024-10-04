import JWT from 'jsonwebtoken'

const userAuth = async(req,res,next)=>{
    const authHeader = req.header.authrization;
    if(!authHeader || !authHeader.startWith("Bearer")){
        next("Auth failed");
    }
    const token = authHeader.split(" ")[-1];
    try {
        const payload = JWT.verify(token,process.env.JWT_SCRET);
        req.user = {userID : payload.userID};
        next();
    } catch (error) {
        next("Auth failed");
    }

}

export default userAuth;