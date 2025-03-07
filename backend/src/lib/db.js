import mongoose from "mongoose"

export const connectDB=async()=>{

    try {
        const con=await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MONGODB CONECTED:${con.connection.host}`);

    } catch (error) {
        console.log(error)
        
    }
}