const db = require("../config/db")


//  GET ALL STUDENTS DETAILS
const getStudents =async (req, resp)=>{
try {
    const data= await db.query('select * from students')
    if(!data){
        return resp.status(404).send({
        success: false,
        message: 'No Records found'
        })
    }
    resp.status(200).send({
        success: true,
        message: 'All Student Records',
        totalStudents: data[0].length, 
        data: data[0]
    })
} catch (error) { 
    console.log(error)
    resp.status(500).send({
        success: false,
        message: 'Error in Get All Student API',
        error
    })
}
}



// GET STUDENT by ID
const getStudentById= async(req,resp)=>{
    try {
        const studentId= req.params.id;
        if(!studentId){
            return resp.status(404).send({
                success: false,
                message:'invalid student Id',
                
            })
        }
        const data= await db.query(`select * from students where roll_no=?`,[studentId])
        if(!data){
            return resp.status(404).send({
                success: false,
                message: 'No Record Found'
            })
        }
        resp.status(200).send({
            success: true,
            studentDetails: data[0]
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: 'Error in Get Student By Id',
            error})
    }
}


// INSERT STUDENT
const createStudent= async(req, resp)=>{
    try {
        const {roll_no,name, age, gender, mark, percent}=req.body
        if(!roll_no ||!name || !age || !gender || !mark || !percent){
            return resp.status(500).send({
                success: false,
                message:'Please provide all field'
            })
        }
        const data= await db.query(`insert into students (roll_no, name, age, gender, mark, percent) values (?, ?, ?, ?, ?, ?)`,[roll_no,name, age, gender, mark, percent])
        if(!data){
            return resp.status(404).send({
                success: false,
                message:'Error in INSERT Query'
            })
        }
        resp.status(200).send({
            success: true, 
            message: 'new Student added'
        })
    } catch (error) { 
        console.log(error)
        resp.status(500).send({
            success:false,
            message: 'Error in Create Student API',
            error
        })
        
    }
}


// UPDATE THE STUDENT
const updateStudent= async(req, resp)=>{
    try {
        const studentId= req.params.id
        if(!studentId){
            return resp.status(404).send({
                success: false,
                message: 'Invalid Id '
            })
        }
        const {roll_no, name, age, gender, mark, percent}=req.body
        const data= await db.query(` update students set roll_no= ?, name= ?, age= ?, gender= ?, mark= ?, percent= ? where roll_no= ?`, [roll_no,name, age, gender, mark, percent, studentId])

        if(!data){
            return resp.status(500).send({
                success: false,
                message: 'Error in Update'
            })
        }
        resp.status(200).send({
            success: true,
            message: 'Student data update sucessfull'
        })


    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: 'Error in Update Student API',
            error
        })
    }
}



// DELETE THE STUDENT DETAILS

const deleteStudent = async (req,resp)=>{
try {
    
    const studentId= req.params.id;
    if(!studentId){
        return resp.status(404).send({
            success: false,
            message: 'Please Provide Valid Student ID'
        })
    }
    await db.query(`delete from students where roll_no= ?`, [studentId])
    resp.status(200).send({
        success: true,
        message: 'Delete the Student Details Successfully'
    })
} catch (error) {
    console.log(error)
    resp.status(500).send({
        success: false,
        message: 'Errorn in Delete API',
        error
    })
}
}

module.exports= {getStudents, getStudentById, createStudent, updateStudent, deleteStudent}