require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
 
const PORT = process.env.PORT || 9000

// Initialize http server
const app = express()

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser:true, useUnifiedTopology: true})

const db = mongoose.connection

// Event listeners for database 
db.on('error', (error) => { console.error(error) })
db.once('open', () => { console.log('Mongo DB Connected...') })

// Telling express app that we are accepting json
app.use(express.json())  

// Router for users route
const usersRouter = require('./routes/users')
// "For all requests to /users, all requests must be sent to usersRouter"
app.use('/users', usersRouter)

app.listen(PORT, () => console.log('Server Started on port: ' + PORT))