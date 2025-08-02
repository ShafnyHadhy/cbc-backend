import mongoose from "mongoose";

//structure for Student collection
const studentSchema = new mongoose.Schema(
    {
        name: String,
        age: Number,
        city: String
    }
)

//to connect collllection with backend
const Student = mongoose.model("Student", studentSchema)

//to Export model student
export default Student