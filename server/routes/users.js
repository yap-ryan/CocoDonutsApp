const express = require('express')
const router = express.Router()

// Importing User model 
const User = require('../models/user')

// Password hashing handler
const bcrypt = require('bcrypt')

// Input sanitizer against query selector injection attacks
const sanitize = require('mongo-sanitize')

// All requests should be async to prevent process blocking
// Handle Get requests for ALL users
router.get('/', async (req,res) => {
    try{
        // Get all users
        const users = await User.find()
        res.json(users)
        console.log('Get (all users) Success')

    } catch(err) {
        res.json({
            status: 'ERROR', message: 'Server Error' })
        console.error(err)
    }
})

// Handle Get requests for individual users
router.get('/:id', async (req,res) => {

    const cleanId = sanitize(req.params.id)

    try{
        // Find user
        const user = await User.findById(cleanId)
        res.json(user)
        console.log('Get Success')

    } catch(err) {
        res.json({
            status: 'ERROR', message: 'Server Error' })
        console.error(err)
    }
})

// Handle Signup Post requests
router.post('/signup', async (req,res) => {
    let {name, email, phone, password} = req.body

    name = name.trim()
    email = email.trim().toLowerCase()
    phone = phone.trim()
    password = password.trim()


    // Conditions for user info before posting new user
    if (name == '' || email == '' || phone == '' || password == '' ) {
        res.json({
            status: 'ERROR',
            message: 'Empty input field'
        })
    } else if (! /^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: 'ERROR',
            message: 'Invalid name entered: Please only use letters'
        })
    } else if (! /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)){
        res.json({
            status: 'ERROR',
            message: 'Invalid email entered'
        })
    } else if (! /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)) {
        res.json({
            status: 'ERROR',
            message: 'Invalid phone number entered'
        })
    } else if (password.length < 8 || password.length > 20) {
        res.json({
            status: 'ERROR',
            message: 'Password must be between 8 to 20 characters'
        })
    } else {
        // Check if email and phone already being used before posting
        try{    
            const usersWithEmail = await User.find({email})
            const usersWithPhone = await User.find({phone})

            if (usersWithEmail.length > 0) { // If user exists w/ same email
                res.json({
                    status: 'ERROR',    
                    message: 'Email already in use'
                })
            } else if (usersWithPhone.length > 0) { // If user exists w/ same phone 
                res.json({
                    status: 'ERROR',    
                    message: 'Phone Number already in use'
                })
            } else {
                try {
                    //Everything went well! Hash provided password
                    const hashedPassword = await bcrypt.hash(password, 10) 

                    const newUser = new User(
                        {
                            name,
                            email,
                            phone,
                            password: hashedPassword,
                            points: 0
                        }
                    )

                    // Save new user to db
                    try{    
                        const result = await newUser.save()
                        res.json({
                            status: 'SUCCESS',
                            message: 'Sign-up Successful',
                            data: result
                        })
                        console.log('Sign-up Success')
                    } catch(err){
                        res.json({
                            status: 'ERROR', message: 'Could not save user to db on signup' })
                        console.error(err)                
                    }

                } catch (err) {
                    res.json({
                        status: 'ERROR', 
                        message: 'Server Error while hashing password' 
                    })
                    console.error(err)
                }

            }

        } catch (err) {
            res.json({
                status: 'ERROR', message: 'Server Error while checking for existing users with same email or phone' })
            console.error(err)
        }
    }  
})

// Handle Login Post Requests
router.post('/login', async (req,res) => {
    let {email, password} = req.body

    email = email.trim().toLowerCase()
    password = password.trim()

    if (email == "" || password == "") {
        res.json({
            status: 'ERROR',
            message: 'Empty input field'
        })
        console.log('Server Error: Empty input field')
    } else {
        try {
            const user = await User.find({email})
            if(user.length) {// If user exists
                const hashedPassword = user[0].password

                try {
                    const passwordsMatch = await bcrypt.compare(password, hashedPassword)

                    if (passwordsMatch) {
                        res.json({
                            status: 'SUCCESS',
                            message: "Login Successful",
                            data: user
                        })
                        console.log('Login Success')

                    } else {
                        res.json({
                            status: 'ERROR',
                            message: "Invalid password entered",
                        })
                        console.log('Server Error: Invalid password entered')
                    }
                } catch (err) {
                    res.json({
                        status: 'ERROR',
                        message: "Error while comparing passwords"
                    })
                    console.log('Server Error: Error while comparing passwords')
                }
            } else {
                res.json({
                    status: 'ERROR',
                    message: "Email entered does not exist"
                })
                console.log('Server Error: Email entered does not exist')

            }

        } catch (err) {
            res.json({
                status: 'ERROR', message: 'Server Error while checking for existing user' })
            console.error(err)
        }

    }
})


// Handle Patch requests
router.patch('/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        let valueChanged = false

        // Only patch password if the password will change & not null
        if (req.body.password != null && req.body.password != user.password){
            // New Password must fit length requirements
            if (password.length < 8 || password.length > 20) {
                user.password = req.body.password 
                valueChanged = true
            } else {
                res.json({status: 'ERROR', message: 'Password must be between 8 to 20 characters'})
                console.log('No Update: Password must be between 8 to 20 characters')
            }
        }

        // Only patch email if the email will change & not null
        if (req.body.email != null && req.body.email.toLowerCase() != user.email){
            // New Email must fit regex
            if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(req.body.email)){
                user.email = req.body.email.toLowerCase()
                valueChanged = true
            } else {
                res.json({message: 'Entered email is invalid'})
                console.log('No Update: Entered email is invalid')
            }
        }   
        
        // Only patch points if the points will change & not null
        if (req.body.points != null && req.body.points != user.points){
            user.points = req.body.points 
            valueChanged = true
        }
        
        // Only save change if a value is changed (prevent redundant db queries)
        if (valueChanged) {
            const a1 = await user.save()
            res.json(a1)
            console.log('Update Successful')
        } else {
            res.json({message: 'No Update: Values inputed identical to those in database'})
            console.log('No Update: Values inputed identical to database')
        }

    } catch(err) {
        res.json({
            status: 'ERROR', message: 'Server Error' })
        console.error(err)
    }

})

// Handle Delete requests
router.delete('/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        const a1 = await user.delete()
        res.json({message: 'User successfully deleted'})
        console.log('Delete Successful')
    } catch(err) {
        res.json({
            status: 'ERROR', message: 'Server Error' })
        console.error(err)

    }
})

module.exports = router
