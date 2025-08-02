import express from "express";
import { createStudent, getStudents } from "../controllers/studentsController.js";

const studentRouter = express.Router();

studentRouter.get("/", getStudents)

studentRouter.post("/", createStudent)

studentRouter.delete("/",
    ()=>{
        console.log("Delete request into studentRouter")
    }
)

studentRouter.put("/",
    ()=>{
        console.log("Put request into studentRouter")
    }
)

export default studentRouter