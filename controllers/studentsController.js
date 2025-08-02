import Student from "../models/student.js"

// export function getStudents(req,res){

//     //read and get all the student details from mongoDB database
//     Student.find().then(
//         (student)=>{
//             res.json(
//                 student
//             )
//         }
//     ).catch(
//         ()=>{

//         }
//     )
// }


export async function getStudents(req, res){
     //read and get all the student details from mongoDB database

     try{
        const students = await Student.find();
        res.json(students);

     }catch(error){
        console.log(error)
        res.status(500).json({
            message: "Failed to retrive students"
        });
     }
}


export function createStudent(req,res){

    if(req.user == null){
        res.status(401).json({
            message: "Please login and try again."
        })
        return
    }

    if(req.user.role != "admin"){
        res.status(403).json({
            message: "You must be an admin to create a student"
        })
        return
    }

    const student = new Student(
        {
            name : req.body.name,
            age : req.body.age,
            city : req.body.city
        }
    )

    student.save().then(
        ()=>{
            res.json(
                {
                    message: "Student created successfully."
                }
            )
        }
    ).catch(
        ()=>{
            res.json(
                {
                    message: "Failed to create student..."
                }
            )
        }
    )
}