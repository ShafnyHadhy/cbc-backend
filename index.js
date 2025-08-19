import express from "express";
import mongoose from "mongoose"; //library to establish database connection
import studentRouter from "./routes/studentsRouter.js";
import userRouter from "./routes/userRouter.js";
import jwt from 'jsonwebtoken'
import productRouter from "./routes/productRouter.js";
import cors from 'cors';
import dotenv from 'dotenv';

//loads whats inside on .env file
dotenv.config();

//making const variable
const app = express();

//a middleware to connect backend and frontend
app.use(cors());

//Middleware to parse JSON bodies
app.use(express.json())

//Middleware to parse requests with token
app.use(
    (req,res,next)=>{

        let token = req.header("Authorization")

        if(token != null){

            token = token.replace("Bearer ", "")
            
            jwt.verify(token, process.env.JWT_SECRET,
                (err,decoded)=>{
                   if(decoded == null){
                        res.json(
                            {
                                message: "Invalid token please login agin."
                            }
                        )
                        return
                   }else{
                        req.user = decoded
                   }
                }
            )
        }
        next()
    }
)

//link to connect backend with mongoDB
const connectionString = process.env.MONGO_URI;

//connect DB and project
mongoose.connect(connectionString).then(
    ()=>{
        console.log("Your database connected successfully!")
    }
).catch(
    ()=>{
        console.log("Database connection failed...")
    }
)

app.use("/api/students", studentRouter)
app.use("/api/users", userRouter)
app.use("/api/products", productRouter)

// function success(){
//     console.log("Server is started")
// }

//to start the app we have to give two inputs
//instead of creating a function we can directly implement a non-name function like below

app.listen(5000, 
    ()=>{
        console.log("Server is running on port 5000")
    }
)
