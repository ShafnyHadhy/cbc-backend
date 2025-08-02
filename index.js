import express from "express";
import mongoose from "mongoose"; //library to establish database connection
import studentRouter from "./routes/studentsRouter.js";
import userRouter from "./routes/userRouter.js";
import jwt from 'jsonwebtoken'
import productRouter from "./routes/productRouter.js";

//making const variable
const app = express()

//Middleware to parse JSON bodies
app.use(express.json())

//Middleware to parse requests with token
app.use(
    (req,res,next)=>{

        let token = req.header("Authorization")

        if(token != null){

            token = token.replace("Bearer ", "")
            
            jwt.verify(token,"jwt-secret",
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
const connectionString = "mongodb+srv://admin:123@cluster0.pny3i7y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//connect DB and project
mongoose.connect(connectionString).then(
    ()=>{
        console.log("Database connected successfully!")
    }
).catch(
    ()=>{
        console.log("Database connection failed...")
    }
)

app.use("/students", studentRouter)
app.use("/users", userRouter)
app.use("/products", productRouter)

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

