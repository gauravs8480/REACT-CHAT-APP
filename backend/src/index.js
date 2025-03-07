import express from "express"
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv";
dotenv.config()
import { connectDB } from "./lib/db.js";
const app=express();
app.use(express.json());
app.use("/api/auth",authRoutes)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

const port=process.env.PORT


app.listen(port,()=>{
    console.log(`server running on ${port}`);
    connectDB()
    
})