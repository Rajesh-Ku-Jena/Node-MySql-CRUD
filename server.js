const express = require('express')
const morgan= require('morgan')
const dotenv= require('dotenv');
const mySqlPool = require('./config/db');

// configure dotenv
dotenv.config()

// rest object
const app= express();

// middleware
app.use(morgan('dev'))
app.use(express.json())
// routes
app.use('/api/v1/students', require('./routes/studentsRoute'))
app.get('/', (req,resp)=>{
    resp.status(200).send('<h1>Node js MysqlS </h1>')
})

// port
const PORT= process.env.PORT || 8000


// conditionally listen mysql
mySqlPool.query('SELECT 1').then(() =>{
    // my sql
    console.log("mysql database is connected")
    app.listen(PORT, () =>{
        console.log(`server Running on port ${process.env.PORT}`);
    } )
}).catch((error) =>{
    console.log(error)
})

// listen
// app.listen(PORT, () =>{
//     console.log(`server Running on port ${process.env.PORT}`);
// } )