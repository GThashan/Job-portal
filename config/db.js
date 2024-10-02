import mongoose from 'mongoose'

const dbconn = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        
        console.log("Database connected");
     
    } catch (error) {
    console.log(error)
    }
}

export default dbconn;