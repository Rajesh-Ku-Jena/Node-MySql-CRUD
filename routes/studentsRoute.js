const express= require('express')
const { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require('../controllers/studentsController')

// router object
const router= express.Router()

// routes

// GET ALL STUDENT
router.get('/getall', getStudents)

// GET STUDENT BY ID
router.get('/get/:id', getStudentById)

// INSERT THE STUDENT
router.post('/create', createStudent)

// UPDATE THE STUDENT TABLE
router.put('/update/:id',updateStudent )

// DELETE STUDENT
router.delete('/delete/:id', deleteStudent)
module.exports= router